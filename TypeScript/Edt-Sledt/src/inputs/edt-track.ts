import { OSC$ } from '../communication/osc';
import { ITrack } from '../../../Shared/devices/types';
import { OSCDevices } from '../../config/config';
import { filter, map, Observable } from 'rxjs';

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
