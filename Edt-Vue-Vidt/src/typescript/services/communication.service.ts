import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import Socket = SocketIOClient.Socket;
import * as io from "socket.io-client";
import { IBeatMsg, IIntensityMsg, IPhotoMsg, IPresetMsg, ITextMsg, IVideoMsg } from '../../../../Shared/socket';

export interface ICommunicationService {
    presetObservable: Observable<IPresetMsg>;
    beatObservable: Observable<IBeatMsg>;
    intensityObservable: Observable<IIntensityMsg>;
    photoObservable: Observable<IPhotoMsg>;
    textObservable: Observable<ITextMsg>;
    videoObservable: Observable<IVideoMsg>;
}

class CommunicationService implements ICommunicationService {
    private socket: Socket;
    public presetObservable: Observable<IPresetMsg>;
    public beatObservable: Observable<IBeatMsg>;
    public intensityObservable: Observable<IIntensityMsg>;
    public photoObservable: Observable<IPhotoMsg>;
    public textObservable: Observable<ITextMsg>;
    public videoObservable: Observable<IVideoMsg>;

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

        this.photoObservable = Observable.create((observer: Observer<IPhotoMsg>) => {
            this.socket.on('photo', (data: IPhotoMsg) => {
                observer.next(data);
            });
        });

        this.textObservable = Observable.create((observer: Observer<ITextMsg>) => {
            this.socket.on('text', (data: ITextMsg) => {
                observer.next(data);
            });
        });

        this.videoObservable = Observable.create((observer: Observer<IVideoMsg>) => {
            this.socket.on('text', (data: IVideoMsg) => {
                observer.next(data);
            });
        });
    }
}

export const communicationService: ICommunicationService = new CommunicationService();