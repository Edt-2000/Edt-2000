import { OSC$ } from "../communication/osc";
import { OSCDevices } from "../../config/config";
import { filter, map, Observable } from "rxjs";

// Filter and send out midi messages with this preset data if subscribed
interface IPedalMsg {
    instance: number;
    pedal: number;
}

export const edtPedal$: Observable<IPedalMsg> = OSC$.pipe(
    filter(
        (OSCMsg) =>
            OSCMsg.addresses.length === 2 &&
            OSCMsg.addresses[0] === OSCDevices.EdtPedal &&
            +OSCMsg.addresses[1] >= 1 &&
            +OSCMsg.addresses[1] <= 127 &&
            OSCMsg.values.length === 1,
    ),
    map((OSCMsg) => {
        return {
            instance: +OSCMsg.addresses[1],
            pedal: OSCMsg.values[0],
        };
    }),
);
