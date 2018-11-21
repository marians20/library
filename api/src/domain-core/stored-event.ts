import { Event } from './event';
import { Guid } from 'guid-typescript';

export class StoredEvent extends Event {
    public id: Guid;
    public data: string;
    public user: string;

    /**
     *
     */
    constructor(theEvent: Event, data: string, user: string) {
        super();
        this.id = Guid.create();
        this.messageType = theEvent.messageType;
        this.aggregateId = theEvent.aggregateId;
        this.data = data;
        this.user = user;
    }
}
