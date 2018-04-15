import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs/Observable';
import {Actions, CUE_LIST, PRESET_STATE} from '../../../Shared/actions';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {IControlPresetMsg, IPresetCue} from '../../../Shared/types';


@Injectable()
export class CommunicationService {
    // TODO: this does not give typing!
    actions$ = {
        [PRESET_STATE]: new BehaviorSubject<IControlPresetMsg[]>([]),
        [CUE_LIST]: new BehaviorSubject<IPresetCue[]>([]),
    };

    private _socket$: Observable<Actions> = this.socket.fromEvent('toControl');

    constructor(private socket: Socket) {
        this._socket$.subscribe(msg => {
            if (this.actions$[msg.type]) {
                this.actions$[msg.type].next(msg.payload);
            } else {
                console.log('Unknown msg: ', msg.type);
            }
        });
    }

    toSledt(message: any) {
        this.socket.emit('fromControl', message);
    }
}
