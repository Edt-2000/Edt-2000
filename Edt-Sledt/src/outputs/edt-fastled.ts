import {DeviceIPs, Modii, OSCDevices,} from '../../../Shared/config';
import {IColor} from '../../../Shared/socket';
import {sendToOSC} from "../communication/osc";

export function EdtLEDSpark(instance: number = 0, start: number, end: number, duration: number, colorMsg: IColor) {
    sendToOSC(DeviceIPs.edtcUDosPBUS, [OSCDevices.EdtFastLed, instance ? instance+'' : '?'], [
        Modii.SingleSpark,
        colorMsg.hue,
        colorMsg.brightness,
    ]);
}

export function EdtLEDRainbow(instance: number = 0, start: number, end: number, colorMsg: IColor, deltaHue: number) {
    sendToOSC(DeviceIPs.edtcUDosPBUS, [OSCDevices.EdtFastLed, instance ? instance+'' : '?'],[
        Modii.RainbowSolid,
        start,
        end,
        colorMsg.hue,
        deltaHue,
    ]);
}

export function FastLedtSingleSolid(instance: number = 0, colorMsg: IColor, start: number = 0, end: number = 127) {
    sendToOSC(DeviceIPs.edtcUDosPBUS, [OSCDevices.EdtFastLed, instance ? instance+'' : '?'], [
        Modii.SingleSolid,
        start,
        end,
        colorMsg.hue,
        colorMsg.saturation,
        colorMsg.brightness,
    ]);
}
