import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs/Observable';
import {Actions, PRESET_STATE} from '../../../Shared/actions';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {IControlPresetMsg} from '../../../Shared/types';

@Injectable()
export class CommunicationService {
    public presetState$ = new BehaviorSubject<IControlPresetMsg[]>([]);

    private _socket$: Observable<Actions> = this.socket.fromEvent('toControl');

    constructor(private socket: Socket) {
        // This subscription makes sure the socket connection stays alive, the behaviorSubjects act as a cache
        this._socket$.subscribe(msg => {
            switch (msg.type) {
                case PRESET_STATE:
                    this.presetState$.next(msg.payload);
                    break;

                default:
                    console.info('Unknown msg:', msg);
            }
        });
    }

    toSledt(message: any) {
        this.socket.emit('fromControl', message);
    }
}
