import {
    Modii,
    OSCDevices,
} from '../../../Shared/config';
import {IColor} from '../../../Shared/socket';
import {sendToSerial} from '../communication/serial';

export function EdtLEDSpark(instance: number = 0, start: number, end: number, duration: number, colorMsg: IColor) {
    sendToSerial(OSCDevices.EdtFastLed, instance, [
        Modii.SingleSpark,
        colorMsg.hue,
        colorMsg.brightness,
    ]);
}

export function EdtLEDRainbow(instance: number = 0, start: number, end: number, colorMsg: IColor, deltaHue: number) {
    sendToSerial(OSCDevices.EdtFastLed, instance,[
        Modii.RainbowSolid,
        start,
        end,
        colorMsg.hue,
        deltaHue,
    ]);
}

export function FastLedtSingleSolid(instance: number = 0, colorMsg: IColor, start: number = 0, end: number = 127) {
    sendToSerial(OSCDevices.EdtFastLed, instance, [
        Modii.SingleSolid,
        start,
        end,
        colorMsg.hue,
        colorMsg.saturation,
        colorMsg.brightness,
    ]);
}
