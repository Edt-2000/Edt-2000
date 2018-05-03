import {DeviceIPs, Modii, OSCDevices} from '../../../Shared/config';
import {IColor} from '../../../Shared/socket';
import {sendToOSC} from '../communication/osc';

export function EdtLEDSpark(instance: number = 0, start: number, end: number, duration: number, colorMsg: IColor) {
    sendToOSC(DeviceIPs.edtDispEdter, [OSCDevices.EdtDispEdter], [
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

    sendToOSC(DeviceIPs.edtDispEdter, [OSCDevices.EdtDispEdter], [
        Modii.RainbowSolid,
        start,
        end,
        colorMsg.hue,
        deltaHue,
    ]);
}

/**
 * EdtKitt FX - Running lights
 * @param {IColor} colorMsg
 * @param {number} speed    Number between 1-8
 * @constructor
 */
export function EdtKitt(colorMsg: IColor, speed: number) {
    sendToOSC(DeviceIPs.edtDispEdter, [OSCDevices.EdtDispEdter, '?'], [
        Modii.Chase,
        colorMsg.hue,
        speed,
    ]);
}

export function EdtSingleSolid(instance: number = 0, colorMsg: IColor) {
    sendToOSC(DeviceIPs.edtDispEdter, [OSCDevices.EdtDispEdter, '?'], [
        Modii.SingleSolid,
        0,
        127,
        colorMsg.hue,
        colorMsg.saturation,
        colorMsg.brightness,
    ]);
}
