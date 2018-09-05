import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Actions, nextActionFromMsg} from '../../../Shared/actions';

@Injectable()
export class SocketService {
    constructor(private socket: Socket) {
        socket.on('toControl', nextActionFromMsg);
    }

    toSledt(message: Actions) {
        this.socket.emit('fromControl', message);
    }
}
