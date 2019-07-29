import { DeviceIPs, Modii, OSCDevices, OSCDispedtOutPort } from '../../../Shared/config';
import { IColor } from '../../../Shared/helpers/types';
import { sendToOSC } from '../communication/osc';

export function FastLedtSpark(
    instance: number,
    colorMsg: IColor,
    speed: number,
    start: number = 0,
    end: number = 127,
) {
    sendToOSC(
        DeviceIPs.edtDispEdter,
        OSCDispedtOutPort,
        [OSCDevices.EdtFastLed + instance],
        [
            Modii.SingleSpark,
            start,
            end,
            colorMsg.h,
            colorMsg.s,
            colorMsg.b,
            speed,
        ],
    );
}

export function FastLedtRainbowSpark(
    instance: number = 0,
    duration: number,
    startHue: number,
    deltaHue: number,
    start: number = 0,
    end: number = 127,
) {
    sendToOSC(
        DeviceIPs.edtDispEdter,
        OSCDispedtOutPort,
        [OSCDevices.EdtFastLed + instance],
        [Modii.RainbowSpark, start, end, startHue, deltaHue, duration],
    );
}

export function FastLedtSingleSolid(
    instance: number,
    colorMsg: IColor,
    start: number = 0,
    end: number = 127,
) {
    sendToOSC(
        DeviceIPs.edtDispEdter,
        OSCDispedtOutPort,
        [OSCDevices.EdtFastLed + instance],
        [Modii.SingleSolid, start, end, colorMsg.h, colorMsg.s, colorMsg.b],
    );
}

export function FastLedtSinglePulse(
    instance: number,
    duration: number,
    colorMsg: IColor,
    start: number = 0,
    end: number = 127,
) {
    sendToOSC(
        DeviceIPs.edtDispEdter,
        OSCDispedtOutPort,
        [OSCDevices.EdtFastLed + instance],
        [
            Modii.SinglePulse,
            start,
            end,
            colorMsg.h,
            colorMsg.s,
            colorMsg.b,
            duration,
        ],
    );
}

export function FastLedtStrobe(instance: number, speed: number, hue: number) {
    sendToOSC(
        DeviceIPs.edtDispEdter,
        OSCDispedtOutPort,
        [OSCDevices.EdtFastLed + instance],
        [Modii.Strobo, hue, speed],
    );
}
