import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import Socket = SocketIOClient.Socket;
import * as io from "socket.io-client";
import { IBeatMsg, IIntensityMsg, IPresetMsg, ITextMsg } from '../../../../Shared/socket';

export interface ICommunicationService {
    presetObservable: Observable<IPresetMsg>;
    beatObservable: Observable<IBeatMsg>;
    intensityObservable: Observable<IIntensityMsg>;
    textObservable: Observable<ITextMsg>;
}

class CommunicationService implements ICommunicationService {
    private socket: Socket;
    public presetObservable: Observable<IPresetMsg>;
    public beatObservable: Observable<IBeatMsg>;
    public intensityObservable: Observable<IIntensityMsg>;
    public textObservable: Observable<ITextMsg>;

    constructor() {
        this.socket = io('localhost:8080');

        this.socket.on('connect', () => {
            console.log('socket connected');
        });

        this.presetObservable = Observable.create((observer: Observer<IPresetMsg>) => {
            this.socket.on('preset', (data: IPresetMsg) => {
                observer.next(data);
            });
        });

        this.beatObservable = Observable.create((observer: Observer<IBeatMsg>) => {
            this.socket.on('beat', (data: IBeatMsg) => {
                observer.next(data);
            });
        });

        this.intensityObservable = Observable.create((observer: Observer<IIntensityMsg>) => {
            this.socket.on('intensity', (data: IIntensityMsg) => {
                observer.next(data);
            });
        });

        this.textObservable = Observable.create((observer: Observer<ITextMsg>) => {
            this.socket.on('text', (data: ITextMsg) => {
                observer.next(data);
            });
        });
    }
}

export const communicationService: ICommunicationService = new CommunicationService();