import { OSC$ } from '../communication/osc';
import { filter, map } from 'rxjs/operators';
import { OSCDevices } from '../../../Shared/config';

export const edtGuitar$ = OSC$.pipe(
    filter(OSCmsg => {
        return (OSCmsg.addresses.length === 1 && OSCmsg.addresses[0] === OSCDevices.EdtGitar);
    }),
    map(OSCmsg => OSCmsg.values[0]),
);
