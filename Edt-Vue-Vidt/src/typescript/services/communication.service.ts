import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import Socket = SocketIOClient.Socket;
import * as io from "socket.io-client";

export interface CommunicationServiceModel {
    socketObservable: Observable<any>;
    presetObservable: Observable<any>;
}

class CommunicationService implements CommunicationServiceModel {
    private socket: Socket;
    public socketObservable: Observable<any>;
    public presetObservable: Observable<any>;

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

        this.presetObservable = Observable.create((observer: Observer<any>) => {
            this.socket.on('preset', (data: any) => {
                observer.next(data);
            });
        });
    }
}

export const communicationService: CommunicationServiceModel = new CommunicationService();