import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import Socket = SocketIOClient.Socket;
import * as io from "socket.io-client";

export class CommunicationService {
    public socket: Socket;
    public socketObservable: Observable<any>;

    constructor() {
        this.socket = io('localhost:8080');

        this.socket.on('connect', () => {
            console.log('socket connected');
        });

        this.socketObservable = Observable.create((observer: Observer<any>) => {
            this.socket.on('message', (data: any) => {
                observer.next(data);
            });
        });
    }

}