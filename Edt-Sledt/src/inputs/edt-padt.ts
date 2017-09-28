import {OSCInput} from '../communication/osc';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import {PresetMsg} from '../types';

// Filter and send out midi messages with this preset data if subscribed
export const ManualPresets: Observable<PresetMsg> = OSCInput
    .filter((OSCMsg) => (
        OSCMsg.addresses.length === 2 &&
        OSCMsg.addresses[0] === 'Preset' &&
        +OSCMsg.addresses[1] >= 1 &&
        +OSCMsg.addresses[1] <= 127 &&
        OSCMsg.values.length === 1 &&
        (OSCMsg.values[0] === 1 || OSCMsg.values[0] === 0)
    ))
    .map((OSCMsg) => {
        return {
            preset: +OSCMsg.addresses[1],
            modifier: 127,
            state: !!OSCMsg.values[0]
        }
    });
