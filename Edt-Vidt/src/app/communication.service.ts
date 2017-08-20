import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/filter'
import {colorMsg, intensityMsg, preparePresetMsg} from '../../../SharedTypes/socket';


@Injectable()
export class CommunicationService {
    private _messageObs: Observable<any>;

    public color: Observable<colorMsg>;
    public preset: Observable<preparePresetMsg>;
    public intensity: Observable<intensityMsg>;

    constructor(private socket: Socket) {
        this._messageObs = this.socket.fromEvent('message');

        // Preset msg
        this.preset = this._messageObs.filter((msg: any): msg is preparePresetMsg => {
            return !!msg.preset;
        });

        // Expose observables for various message types
        this.color = this._messageObs.filter((msg: any): msg is colorMsg => {
            return !!msg.color && !!msg.bgColor;
        });
        this.intensity = this._messageObs.filter((msg: any): msg is intensityMsg => {
            return typeof msg.intensity === 'number';
        });

    }
}
