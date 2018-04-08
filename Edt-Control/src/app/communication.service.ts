import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable()
export class CommunicationService {
    private _socket = this.socket.fromEvent('toControl');

    constructor(private socket: Socket) {}

    toSledt(message: any) {
        this.socket.emit('fromControl', message);
    }

    getSledt$() {
        return this._socket;
    }
}
