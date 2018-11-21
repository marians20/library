import { Router, Request, Response } from 'express';
import { Product } from '../domain/models';
import { AutoWired, Inject, Provides } from 'typescript-ioc';
import { IProductsRepository } from '../infra/repositories';
import { IQueueHelper } from '../infra/queueutils';

@Provides(ProductsController)
export class ProductsController {
    private router: Router;
    private model: any;

    @Inject
    private ProductsRepository!: IProductsRepository;

    @Inject
    private queueHelper!: IQueueHelper;

    constructor() {
        this.router = Router();
        this.model = new Product().getModelForClass(Product);
        this.init();
    }

    public getAll(req: Request, res: Response): void {
        this.ProductsRepository.getAll()
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
        this.ProductsRepository.getById(req.params.id)
            .then((item: any) => res.status(200).json(item))
            .catch(() => res.status(404).send());
    }

    public add(req: Request, res: Response): void {
        const newAirport = new this.model(req.body);

        this.ProductsRepository.add(newAirport)
            .then((item: any) => res.status(201).json(item))
            .catch(err => res.status(400).send(err));
    }

    public update(req: Request, res: Response): void {
        this.ProductsRepository.update(req.params.id, req.body)
            .then((updatedItem: any) => res.status(200).json(updatedItem))
            .catch((err: any) => res.status(400).send(err));
    }

    public delete(req: Request, res: Response): void {
        this.ProductsRepository.delete(req.params.id)
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