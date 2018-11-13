import * as Amqp from 'amqp-ts';
import { config } from '../config';
import { Provides, Singleton } from 'typescript-ioc';

@Provides(RabbitMqHelper)
@Singleton
export class RabbitMqHelper {

    private url = `amqp://${config.queue.user}:${config.queue.password}@${config.queue.host}/${config.queue.vhost}`;
    private connection: any;
    private exchange: any;
    private queue: any
    /**
     *
     */
    constructor() {
        this.connection = new Amqp.Connection(this.url);
        this.exchange = this.connection.declareExchange(config.queue.exchange);
        this.queue = this.connection.declareQueue(config.queue.queue);
        this.queue.bind(this.exchange);
        this.connection.completeConfiguration().then(() => {
            this.send(`Queue initialized ${new Date()}`);
        });
    }

    public startReceiving(callback: any) {
        this.queue.activateConsumer((message: any) => {
            const content = message.getContent();
            if(callback) {
                callback(message);
            } else {
                console.log(`Message received: ${content}`);
            }
            message.ack();
        });
    }

    public send(message: string) {
        const msg2 = new Amqp.Message(message);
        this.exchange.send(msg2);
    }
}