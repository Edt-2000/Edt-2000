import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs/Observable';
import {ctrlActions, PresetActions} from '../../../Shared/actions';
import {filter, map} from 'rxjs/operators';
import {isActionOf} from '../../../Edt-Sledt/node_modules/typesafe-actions/es5-commonjs';

@Injectable()
export class SocketService {
    private _socket$: Observable<ctrlActions> = this.socket.fromEvent('toControl');

    presetState$ = this._socket$.pipe(filter(isActionOf(PresetActions.presetState)), map(msg => msg.payload));
    cueList$ = this._socket$.pipe(filter(isActionOf(PresetActions.cueList)), map(msg => msg.payload));

    constructor(private socket: Socket) {
    }

    toSledt(message: ctrlActions) {
        this.socket.emit('fromControl', message);
    }
}
