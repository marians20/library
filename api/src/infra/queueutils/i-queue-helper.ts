export abstract class IQueueHelper {
    abstract startReceiving(callback: any): void;
    abstract send(message: string): void;
}