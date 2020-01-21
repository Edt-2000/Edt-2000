import { OSC$ } from '../communication/osc';
import { filter, map } from 'rxjs/operators';
import { OSCDevices } from '../../config/config';

export const edtDrum$ = OSC$.pipe(
    filter(OSCmsg => {
        return (
            OSCmsg.addresses.length === 1 &&
            OSCmsg.addresses[0] === OSCDevices.EdtDrum &&
            OSCmsg.values.length === 1
        );
    }),
    map(OSCmsg => OSCmsg.values[0]),
);
