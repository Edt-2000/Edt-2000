import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {OSCDevices} from '../../../SharedTypes/config';
import {OSC$} from '../communication/osc';

// Filter and send out midi messages with this preset data if subscribed
interface IPedalMsg {
    instance: number;
    pedal: number;
}

export const edtPedal$: Observable<IPedalMsg> = OSC$
    .filter((OSCMsg) => (
        OSCMsg.addresses.length === 2 &&
        OSCMsg.addresses[0] === OSCDevices.EdtPedal &&
        +OSCMsg.addresses[1] >= 1 &&
        +OSCMsg.addresses[1] <= 127 &&
        OSCMsg.values.length === 1
    ))
    .map((OSCMsg) => {
        return {
            instance: +OSCMsg.addresses[1],
            pedal: OSCMsg.values[0],
        };
    });
