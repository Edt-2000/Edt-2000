import {
    Modii,
    OSCDevices,
} from '../../../Shared/config';
import {IColor} from '../../../Shared/socket';
import {sendToSerial} from '../communication/serial';

// Might not work yet
// export function EdtLEDSpark(instance: number, colorMsg: IColor) {
//     sendToSerial(OSCDevices.EdtFastLed, instance, [
//         Modii.SingleSpark,
//         colorMsg.hue,
//         colorMsg.brightness,
//     ]);
// }

// Not yet working??
// export function EdtLEDRainbow(instance: number = 0, start: number, end: number, colorMsg: IColor, deltaHue: number) {
//     sendToSerial(OSCDevices.EdtFastLed, instance,[
//         Modii.RainbowSolid,
//         start,
//         end,
//         colorMsg.hue,
//         deltaHue,
//     ]);
// }

export function FastLedtSingleSolid(instance: number, colorMsg: IColor, start: number = 0, end: number = 127) {
    sendToSerial([OSCDevices.EdtFastLed + instance.toString()], [
        Modii.SingleSolid,
        start,
        end,
        colorMsg.hue,
        colorMsg.saturation,
        colorMsg.brightness,
    ]);
}

export function FastLedtSinglePulse(instance: number, duration: number, colorMsg: IColor, start: number = 0, end: number = 127) {
    sendToSerial([OSCDevices.EdtFastLed + instance.toString()], [
        Modii.SinglePulse,
        start,
        end,
        colorMsg.hue,
        colorMsg.saturation,
        colorMsg.brightness,
        duration,
    ]);
}

export function FastLedtStrobe(instance: number, speed: number, hue: number) {
    sendToSerial([OSCDevices.EdtFastLed + instance.toString()], [
        Modii.Strobo,
        hue,
        speed,
    ]);
}


