import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/share';
import {Observable} from 'rxjs/Observable';
import {OSC$} from '../communication/osc';
import {IPresetMsg} from '../types';

// Filter and send out midi messages with this preset data if subscribed
export const manualPresets$: Observable<IPresetMsg> = OSC$
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
            state: !!OSCMsg.values[0],
        };
    });
