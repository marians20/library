import { Guid } from 'guid-typescript';
import { Event } from './event';

export class Notification extends Event {
    public notificationId: Guid;
    public key: string;
    public value: string;
    public version: number;

    /**
     *
     */
    constructor(key: string, value: string) {
        super();
        this.messageType = Notification.name;
        this.notificationId = Guid.create();
        this.version = 1;
        this.key = key;
        this.value = value;
    }
}
