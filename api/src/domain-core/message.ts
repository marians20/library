import { Guid } from 'guid-typescript';

export abstract class Message {
    public messageType: string;
    public aggregateId?: Guid;

    /**
     *
     */
    constructor() {
        this.messageType = Message.name;
    }
}
