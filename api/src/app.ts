import * as express from 'express';
import * as cors from 'cors';
import { AutoWired, Inject } from 'typescript-ioc';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as swagger from 'swagger-express-ts';
import { SwaggerDefinitionConstant } from 'swagger-express-ts';

import { IQueueHelper } from './queueutils';
import { config, IocContainerConfig } from './config';
import { PeopleController, CategoriesController, ProducersController, ProductsController } from './controllers';

export class App{
    private app: express.Application;

    @Inject
    private peopleController!: PeopleController;

    @Inject categoriesController!: CategoriesController;

    @Inject producersController!: ProducersController;

    @Inject productsController!: ProductsController;

    @Inject
    private queueHelper!: IQueueHelper;

    /**
     *
     */
    constructor(dbUrl?: string) {
        this.queueHelper.startReceiving((message: any) => {
            console.log(message.getContent());
        });

        this.app = express();
        this.config();
        this.mongoConfig(dbUrl);
        this.routes();

        this.queueHelper.send(Date.now().toString());
    }

    public get ExpressApp(): express.Application {
        return this.app
    }

    private config(): void {
        // this.app.use(function(req, res, next) {
        //     res.header("Access-Control-Allow-Origin", "*");
        //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        //     next();
        //   });

        this.app.use(cors());

        this.app.use( '/swagger' , express.static( 'swagger' ) );
        this.app.use( '/api-docs/swagger/assets' , express.static( 'node_modules/swagger-ui-dist' ) );
        this.app.use( bodyParser.json() );
        this.app.use( swagger.express(
            {
                definition : {
                    info : {
                        title : "My api" ,
                        version : "1.0"
                    } ,
                    externalDocs : {
                        url : "My url"
                    }
                    // Models can be defined here
                }
            }
        ) );
        this.app.use(bodyParser.json({ type: 'application/json' }));
        this.app.use(bodyParser.urlencoded({ extended: false }));

        IocContainerConfig.configure();
    }

    private mongoConfig(url?: string): void {
        const { db: { host, port, name, user, password } } = config;
        const mongoUrl = url || `mongodb://${host}:${port}/${name}`;
        console.log(`mongoUrl: ${mongoUrl}`);
        mongoose.set('useFindAndModify', false);
        mongoose.connect(mongoUrl, {
                useNewUrlParser: true,
                // authMechanism: 'MONGODB-CR',
                // auth: { authSource: 'admin' },
                // user: user,
                // pass: password
            })
            .then(() => {
                
            }, (error) => {
                console.log('Connection to MongoDB failed. Reason: ')
                console.log(error);
            });
    }

    private routes(): void {
        this.app.use('/api/v1/people', this.peopleController.getRoutes());
        this.app.use('/api/v1/categories', this.categoriesController.getRoutes());
        this.app.use('/api/v1/producers', this.producersController.getRoutes());
        this.app.use('/api/v1/products', this.productsController.getRoutes());
    }
}