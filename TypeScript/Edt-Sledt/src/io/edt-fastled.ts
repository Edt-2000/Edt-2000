import { sendToOSC } from "../communication/osc";
import {
    DeviceIPs,
    Modii,
    OSCDevices,
    OSCDispedtOutPort,
} from "../../config/config";
import { IColor } from "../../../Shared/colors/types";
import { frontLedsSocket } from "./edt-frontleds";

export function FastLedtSpark(
    instance: number,
    colorMsg: IColor,
    speed: number,
    start: number = 0,
    end: number = 127,
) {
    frontLedsSocket.send(
        JSON.stringify({
            animation: "singlePulse",
            led: 255,
            color1: [colorMsg.h, colorMsg.s, colorMsg.b],
            fade: 1,
            speed,
        }),
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
    sendToOSC(DeviceIPs.edtFastLed, OSCDispedtOutPort, {
        addresses: [OSCDevices.EdtFastLed + instance],
        values: [Modii.RainbowSpark, start, end, startHue, deltaHue, duration],
    });
}

export function FastLedtSingleSolid(
    instance: number,
    colorMsg: IColor,
    start: number = 0,
    end: number = 127,
) {
    sendToOSC(DeviceIPs.edtFastLed, OSCDispedtOutPort, {
        addresses: [OSCDevices.EdtFastLed + instance],
        values: [
            Modii.SingleSolid,
            start,
            end,
            colorMsg.h,
            colorMsg.s,
            colorMsg.b,
        ],
    });
}

export function FastLedtSinglePulse(
    instance: number,
    duration: number,
    colorMsg: IColor,
    start: number = 0,
    end: number = 127,
) {
    sendToOSC(DeviceIPs.edtFastLed, OSCDispedtOutPort, {
        addresses: [OSCDevices.EdtFastLed + instance],
        values: [
            Modii.SinglePulse,
            start,
            end,
            colorMsg.h,
            colorMsg.s,
            colorMsg.b,
            duration,
        ],
    });
}

export function FastLedtStrobe(instance: number, speed: number, hue: number) {
    sendToOSC(DeviceIPs.edtFastLed, OSCDispedtOutPort, {
        addresses: [OSCDevices.EdtFastLed + instance],
        values: [Modii.Strobo, hue, speed],
    });
}
