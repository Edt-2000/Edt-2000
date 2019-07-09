import { DeviceIPs, Modii, OSCDevices, OSCDispedtOutPort } from '../../../Shared/config';
import { IColor } from '../../../Shared/types';
import { sendToOSC } from '../communication/osc';

export function RGBLedtSingleSolid(instance: number = 0, colorMsg: IColor) {
    sendToOSC(
        DeviceIPs.edtDispEdter,
        OSCDispedtOutPort,
        [OSCDevices.EdtRGBLed + instance.toString()],
        [Modii.SingleSolid, 0, 127, colorMsg.h, colorMsg.s, colorMsg.b],
    );
}

export function RGBLedtStrobe(instance: number, speed: number, hue: number) {
    sendToOSC(
        DeviceIPs.edtDispEdter,
        OSCDispedtOutPort,
        [OSCDevices.EdtRGBLed + instance.toString()],
        [Modii.Strobo, hue, speed],
    );
}
