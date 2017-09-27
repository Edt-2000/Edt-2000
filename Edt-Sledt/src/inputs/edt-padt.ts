import {OSCInput} from '../communication/osc';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import {virtualOutput} from '../communication/midi';
import {presetMsgChannel} from '../../../SharedTypes/config';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';

// Filter and send out midi messages with this preset data if subscribed
export const ManualPresets: Observable<{ preset: number, state: boolean }> = OSCInput
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
            state: !!OSCMsg.values[0]
        }
    })
    .do((manualPreset) => {
        if (manualPreset.state) {
            virtualOutput.send('noteon', {
                note: manualPreset.preset,
                velocity: 127,
                channel: presetMsgChannel - 1
            });
        } else {
            virtualOutput.send('noteoff', {
                note: manualPreset.preset,
                velocity: 0,
                channel: presetMsgChannel - 1
            });
        }
    })
    .share();
