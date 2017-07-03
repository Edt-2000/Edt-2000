import {Injectable} from "@angular/core";
import {Socket} from "ngx-socket-io";


@Injectable()
export class CommunicationService {

  constructor(private socket: Socket) {
  }

  getMessageObserver() {
    return this.socket.fromEvent('message');
  }

  getModeChangeObserver() {
    return this.socket.fromEvent('mode');
  }
}
