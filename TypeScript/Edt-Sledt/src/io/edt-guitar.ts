import { OSC$ } from "../communication/osc";
import { OSCDevices } from "../../config/config";
import { filter, map } from "rxjs";

export const edtGuitar$ = OSC$.pipe(
    filter((OSCmsg) => {
        return (
            OSCmsg.addresses.length === 1 &&
            OSCmsg.addresses[0] === OSCDevices.EdtGuitar
        );
    }),
    map((OSCmsg) => OSCmsg.values[0]),
);
