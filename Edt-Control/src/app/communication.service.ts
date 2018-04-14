import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {filter, pluck, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {Actions, PRESET_STATE} from '../../../Shared/actions';

@Injectable()
export class CommunicationService {
    private _socket$: Observable<Actions> = this.socket.fromEvent('toControl');

    constructor(private socket: Socket) {}

    toSledt(message: any) {
        this.socket.emit('fromControl', message);
    }

    get presets$() {
        return this._socket$
            .pipe(
                filter(preset => preset.type === PRESET_STATE),
                pluck('payload'),
            );
    }
}
