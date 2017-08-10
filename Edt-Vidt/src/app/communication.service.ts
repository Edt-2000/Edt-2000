import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/filter'
import {colorMsg, preparePresetMsg, targetedMsg} from '../../../SharedTypes/socket';


@Injectable()
export class CommunicationService {
    private _messageObs: Observable<any>;

    public color: Observable<colorMsg>;
    public preset: Observable<preparePresetMsg>;
    public screenId: number;

    constructor(private socket: Socket) {
        // Filter on target screenId's (where 0 is all screens)
        this._messageObs = this.socket.fromEvent<targetedMsg>('message');
            // .filter(msg => msg.screenIds && msg.screenIds.has(this.screenId));
        // Expose observables for various message types
        this.color = this._messageObs.filter((msg: any): msg is colorMsg => {
            return !!msg.color && !!msg.bgColor;
        });
        this.preset = this._messageObs.filter((msg: any): msg is preparePresetMsg => {
            return !!msg.preset;
        });
    }
}
