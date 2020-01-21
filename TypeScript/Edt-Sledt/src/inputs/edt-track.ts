import { Observable } from 'rxjs/Observable';
import { OSC$ } from '../communication/osc';
import { filter, map } from 'rxjs/operators';
import { ITrack } from '../../../Shared/types';
import { OSCDevices } from '../../config/config';

export const edtTrack$: Observable<ITrack> = OSC$.pipe(
    filter(
        (OSCMsg) =>
            OSCMsg.addresses.length === 1 &&
            OSCMsg.addresses[0] === OSCDevices.EdtTrack &&
            OSCMsg.values.length === 6,
    ),
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
