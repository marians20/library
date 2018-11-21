import { Router, Request, Response } from 'express';
import { AutoWired, Inject, Provides } from 'typescript-ioc';
import { Category } from '../domain/models';
import { ICategoriesRepository } from '../infra/repositories';
import { IQueueHelper } from '../infra/queueutils';

@Provides(CategoriesController)
export class CategoriesController {
    private router: Router;
    private model: any;

    @Inject
    private CategoriesRepository!: ICategoriesRepository;

    @Inject
    private queueHelper!: IQueueHelper;

    constructor() {
        this.router = Router();
        this.model = new Category().getModelForClass(Category);
        this.init();
    }

    public getAll(req: Request, res: Response): void {
        this.CategoriesRepository.getAll()
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
        this.CategoriesRepository.getById(req.params.id)
            .then((item: any) => res.status(200).json(item))
            .catch(() => res.status(404).send());
    }

    public add(req: Request, res: Response): void {
        const newAirport = new this.model(req.body);

        this.CategoriesRepository.add(newAirport)
            .then((item: any) => res.status(201).json(item))
            .catch(err => res.status(400).send(err));
    }

    public update(req: Request, res: Response): void {
        this.CategoriesRepository.update(req.params.id, req.body)
            .then((updatedItem: any) => res.status(200).json(updatedItem))
            .catch((err: any) => res.status(400).send(err));
    }

    public delete(req: Request, res: Response): void {
        this.CategoriesRepository.delete(req.params.id)
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