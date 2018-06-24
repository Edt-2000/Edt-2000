import {
    Modii,
    OSCDevices,
} from '../../../Shared/config';
import {IColor} from '../../../Shared/socket';
import {sendToSerial} from '../communication/serial';

export function EdtLEDSpark(instance: number = 0, start: number, end: number, duration: number, colorMsg: IColor) {
    sendToSerial(OSCDevices.EdtFastLed, '?', [
        Modii.SingleSpark,
        start,
        end,
        colorMsg.hue,
        colorMsg.saturation,
        colorMsg.brightness,
        duration,
    ]);
}

export function EdtLEDRainbow(instance: number = 0, start: number, end: number, colorMsg: IColor, deltaHue: number) {
    sendToSerial(OSCDevices.EdtFastLed, '?',[
        Modii.RainbowSolid,
        start,
        end,
        colorMsg.hue,
        deltaHue,
    ]);
}

export function FastLedtSingleSolid(instance: number = 0, colorMsg: IColor) {
    sendToSerial(OSCDevices.EdtFastLed, '?', [
        Modii.SingleSolid,
        0,
        127,
        colorMsg.hue,
        colorMsg.saturation,
        colorMsg.brightness,
    ]);
}
