import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable()
export class CommunicationService {
    constructor(private socket: Socket) {

    }

    public sendToSledt(message: any) {
      console.log('TEST', message);
      this.socket.emit('message', message);
    }
}
