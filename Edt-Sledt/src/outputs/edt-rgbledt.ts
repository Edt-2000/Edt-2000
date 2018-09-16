import {
    Modii,
    OSCDevices,
} from '../../../Shared/config';
import {IColor} from '../../../Shared/socket';
import {sendToSerial} from '../communication/serial';

export function RGBLedtSingleSolid(instance: number = 0, colorMsg: IColor) {
    sendToSerial([OSCDevices.EdtRGBLed + instance], [
        Modii.SingleSolid,
        0,
        127,
        colorMsg.hue,
        colorMsg.saturation,
        colorMsg.brightness,
    ]);
}

export function RGBLedtStrobe(instance: number, speed: number, hue: number) {
    sendToSerial([OSCDevices.EdtRGBLed + instance.toString()], [
        Modii.Strobo,
        hue,
        speed,
    ]);
}
