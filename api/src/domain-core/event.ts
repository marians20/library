import { Message } from './message';

export abstract class Event extends Message {
    public timeStamp!: Date;

    constructor() {
        super();
        this.messageType = Event.name;
        this.timeStamp = new Date();
    }
}
