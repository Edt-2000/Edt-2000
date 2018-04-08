import {Observable} from 'rxjs/Observable';
import {ITrackMsg} from '../../../Shared/socket';
import {OSC$} from '../communication/osc';
import {OSCDevices} from '../../../Shared/config';
import {filter, map} from 'rxjs/operators';

export const edtTrack$: Observable<ITrackMsg> = OSC$.pipe(
    filter((OSCMsg) => (
        OSCMsg.addresses.length === 1 &&
        OSCMsg.addresses[0] === OSCDevices.EdtTrack &&
        OSCMsg.values.length === 6
    )),
    map((OSCMsg) => {
        return {
            left: {
                x: OSCMsg.values[0],
                y: OSCMsg.values[1],
                z: OSCMsg.values[2],
            },
            right: {
                x: OSCMsg.values[3],
                y: OSCMsg.values[4],
                z: OSCMsg.values[5],
            },
        };
    }),
);
