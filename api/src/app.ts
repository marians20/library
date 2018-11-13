import * as express from "express";
import { AutoWired, Inject } from "typescript-ioc";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";

import { RabbitMqHelper } from './queueutils';
import { config, IocContainerConfig } from "./config";
import { PeopleController } from './controllers';

export class App{
    private app: express.Application;

    @Inject
    private peopleController!: PeopleController;

    @Inject
    private rabbitMqHelper!: RabbitMqHelper;

    /**
     *
     */
    constructor(dbUrl?: string) {
        this.rabbitMqHelper.startReceiving((message: any) => {
            console.log(message.getContent());
        });

        this.app = express();
        this.config();
        this.mongoConfig(dbUrl);
        this.routes();

        this.rabbitMqHelper.send(Date.now().toString());
    }

    public get ExpressApp(): express.Application {
        return this.app
    }

    private config(): void {
        this.app.use(bodyParser.json({ type: 'application/json' }));
        this.app.use(bodyParser.urlencoded({ extended: false }));

        IocContainerConfig.configure();
    }

    private mongoConfig(url?: string): void {
        const { db: { host, port, name } } = config;
        const mongoUrl = url || `mongodb://${host}:${port}/${name}`;

        mongoose.set('useFindAndModify', false);
        mongoose.connect(mongoUrl, { useNewUrlParser: true })
            .then(() => {
                
            }, (error) => {
                console.log('Connection to MongoDB failed. Reason: ')
                console.log(error);
            });
    }

    private routes(): void {
        this.app.use('/api/v1/people', this.peopleController.getRoutes());
    }
}