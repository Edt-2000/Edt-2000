import {Observable} from 'rxjs/Observable';
import {OSC$} from '../communication/osc';
import {OSCDevices} from '../../../Shared/config';
import {filter, map} from 'rxjs/operators';

interface IAudio {
    _1: number;
    _2: number;
    _3: number;
    _4: number;
    _5: number;
    _6: number;
    _7: number;
}

export const edtAudio$: Observable<IAudio> = OSC$.pipe(
    filter((OSCMsg) => (
        OSCMsg.addresses.length === 1 &&
        OSCMsg.addresses[0] === OSCDevices.EdtAudio &&
        OSCMsg.values.length === 7
    )),
    map((OSCMsg) => {
        return {
            _1: OSCMsg.values[0],
            _2: OSCMsg.values[1],
            _3: OSCMsg.values[2],
            _4: OSCMsg.values[3],
            _5: OSCMsg.values[4],
            _6: OSCMsg.values[5],
            _7: OSCMsg.values[6],
        };
    }),
);
