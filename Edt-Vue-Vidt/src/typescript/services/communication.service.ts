import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import Socket = SocketIOClient.Socket;
import * as io from "socket.io-client";

// TODO: type messages
export interface CommunicationServiceModel {
    presetObservable: Observable<any>;
    beatObservable: Observable<any>;
    intensityObservable: Observable<any>;
    textObservable: Observable<any>;
}

class CommunicationService implements CommunicationServiceModel {
    private socket: Socket;
    public presetObservable: Observable<any>;
    public beatObservable: Observable<any>;
    public intensityObservable: Observable<any>;
    public textObservable: Observable<any>;

    constructor() {
        this.socket = io('localhost:8080');

        this.socket.on('connect', () => {
            console.log('socket connected');
        });

        this.presetObservable = Observable.create((observer: Observer<any>) => {
            this.socket.on('preset', (data: any) => {
                observer.next(data);
            });
        });

        this.beatObservable = Observable.create((observer: Observer<any>) => {
            this.socket.on('beat', (data: any) => {
                observer.next(data);
            });
        });

        this.intensityObservable = Observable.create((observer: Observer<any>) => {
            this.socket.on('intensity', (data: any) => {
                observer.next(data);
            });
        });

        this.textObservable = Observable.create((observer: Observer<any>) => {
            this.socket.on('text', (data: any) => {
                observer.next(data);
            });
        });
    }
}

export const communicationService: CommunicationServiceModel = new CommunicationService();