import {Injectable} from "@angular/core";
import {Socket} from "ngx-socket-io";


@Injectable()
export class CommunicationService {
  private observer;

  constructor(private socket: Socket) {
    this.observer = this.socket.fromEvent('message');
  }

  getMessageObserver() {
    return this.observer;
  }
}
