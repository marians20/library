import { Command } from "./command";
import { Event } from "./event";

export abstract class IBus {
    public abstract SendCommand<T extends Command>(command: T): any;
    public abstract RaiseEvent<T extends Event>(event: T): any;
}
