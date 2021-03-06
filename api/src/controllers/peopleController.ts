import { Router, Request, Response } from 'express';
import { AutoWired, Inject, Provides } from 'typescript-ioc';
import { ApiPath, ApiOperationGet, SwaggerDefinitionConstant, ApiOperationPost } from 'swagger-express-ts';
import { Person } from '../domain/models';
import { IPeopleRepository } from '../infra/repositories';
import { IQueueHelper } from '../infra/queueutils';

@Provides(PeopleController)
@ApiPath({
    path: "/people",
    name: "People",
    security: { basicAuth: [] }
})
export class PeopleController {
    private router: Router;
    private model: any;

    @Inject
    private peopleRepository!: IPeopleRepository;

    @Inject
    private queueHelper!: IQueueHelper;

    constructor() {
        this.router = Router();
        this.model = new Person().getModelForClass(Person);
        this.init();
    }
    @ApiOperationGet({
        description: "Get person objects list",
        summary: "Get person list",
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "Person" }
        },
        security: {
            apiKeyHeader: []
        }
    })
    public getAll(req: Request, res: Response): void {
        this.peopleRepository.getAll()
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
        this.peopleRepository.getById(req.params.id)
            .then((item: any) => res.status(200).json(item))
            .catch(() => res.status(404).send());
    }

    @ApiOperationPost({
        description: "Post Person object",
        summary: "Post new person",
        parameters: {
            body: { description: "New person", required: true, model: "Person" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    public add(req: Request, res: Response): void {
        const newAirport = new this.model(req.body);

        this.peopleRepository.add(newAirport)
            .then((item: any) => res.status(201).json(item))
            .catch(err => res.status(400).send(err));
    }

    public update(req: Request, res: Response): void {
        this.peopleRepository.update(req.params.id, req.body)
            .then((updatedItem: any) => res.status(200).json(updatedItem))
            .catch((err: any) => res.status(400).send(err));
    }

    public delete(req: Request, res: Response): void {
        this.peopleRepository.delete(req.params.id)
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