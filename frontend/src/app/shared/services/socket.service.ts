import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as socketIo from 'socket.io-client';

@Injectable()
export class SocketService {
    private socket;

    public initSocket(url): void {
        this.socket = socketIo(url);
    }

    public send(message: object): void {
        this.socket.emit('message', message);
    }

    public onMessage(): Observable<object> {
        return new Observable<object>(observer => {
            this.socket.on('message', (data: object) => observer.next(data));
        });
    }

    public onEvent(event: WebGLVertexArrayObjectOES): Observable<any> {
        return new Observable<object>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}