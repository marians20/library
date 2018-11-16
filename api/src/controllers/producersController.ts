import { Router, Request, Response } from 'express';
import { Producer } from '../models';
import { IProducersRepository } from "../repositories";
import { AutoWired, Inject, Provides } from 'typescript-ioc';
import { IQueueHelper } from '../queueutils';

@Provides(ProducersController)
export class ProducersController {
    private router: Router;
    private model: any;

    @Inject
    private ProducersRepository!: IProducersRepository;

    @Inject
    private queueHelper!: IQueueHelper;

    constructor() {
        this.router = Router();
        this.model = new Producer().getModelForClass(Producer);
        this.init();
    }

    public getAll(req: Request, res: Response): void {
        this.ProducersRepository.getAll()
            .then((items: any) => {
                if(items.length == 0) {
                    res.status(204).send();
                } else {
                    this.queueHelper.send(JSON.stringify(items));
                    res.status(200).json(items)
                }
            })
            .catch((err: any) => res.status(400).send(err));
    }

    public getById(req: Request, res: Response): void {
        this.ProducersRepository.getById(req.params.id)
            .then((item: any) => res.status(200).json(item))
            .catch(() => res.status(404).send());
    }

    public add(req: Request, res: Response): void {
        const newAirport = new this.model(req.body);

        this.ProducersRepository.add(newAirport)
            .then((item: any) => res.status(201).json(item))
            .catch(err => res.status(400).send(err));
    }

    public update(req: Request, res: Response): void {
        this.ProducersRepository.update(req.params.id, req.body)
            .then((updatedItem: any) => res.status(200).json(updatedItem))
            .catch((err: any) => res.status(400).send(err));
    }

    public delete(req: Request, res: Response): void {
        this.ProducersRepository.delete(req.params.id)
            .then(()=> res.status(204).send())
            .catch((err: any) => res.status(400).send(err));
    }

    public getRoutes(): Router {
        return this.router;
    }

    private init(): any {
        this.router.get('/', this.getAll.bind(this))
            .get('/:id', this.getById.bind(this))
            .post('/', this.add.bind(this))
            .put('/:id', this.update.bind(this))
            .delete('/:id', this.delete.bind(this));
    }
}