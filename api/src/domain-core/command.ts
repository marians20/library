import { Message } from './message';

export abstract class Command extends Message {
    public timeStamp!: Date;

    /**
     *
     */
    constructor() {
        super();
        this.messageType = Command.name;
        this.timeStamp = new Date();
    }
}
