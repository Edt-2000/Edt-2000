import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/filter'
import {colorMsg, preparePresetMsg} from '../../../SharedTypes/socket';


@Injectable()
export class CommunicationService {
    private _observable: Observable<any>;

    public color: Observable<colorMsg>;

    public preset: Observable<preparePresetMsg>;

    constructor(private socket: Socket) {
        this._observable = this.socket.fromEvent('message');

        this.color = this._observable.filter(isColorMsg);
        this.preset = this._observable.filter(isPreparePresetMsg);
    }
}

// TypeGuards to be able to filter messages to different observables.
function isColorMsg(msg: any): msg is colorMsg {
    return !!msg.color && !!msg.bgColor;
}

function isPreparePresetMsg(msg: any): msg is preparePresetMsg {
    return !!msg.preset;
}
