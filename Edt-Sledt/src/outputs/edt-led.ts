import {DeviceIPs, Modii, OSCDevices} from '../../../SharedTypes/config';
import {IColor} from '../../../SharedTypes/socket';
import {sendToOSC} from '../communication/osc';

/**
 * Flash LEDS
 * @param {number} instance
 * @param {number} start
 * @param {number} end
 * @param {number} duration
 * @param {IColor} colorMsg
 * @constructor
 */
export function EdtLEDSpark(instance: number, start: number, end: number, duration: number, colorMsg: IColor) {

    sendToOSC(DeviceIPs.edtOut, [OSCDevices.EdtLed], [
        Modii.SingleSpark,
        start,
        end,
        colorMsg.hue,
        colorMsg.saturation,
        colorMsg.brightness,
        duration,
    ]);
}

export function EdtLEDRainbow(instance: number, start: number, end: number, colorMsg: IColor, deltaHue: number) {

    sendToOSC(DeviceIPs.edtOut, [OSCDevices.EdtLed], [
        Modii.RainbowSolid,
        start,
        end,
        colorMsg.hue,
        deltaHue,
    ]);
}

export function EdtKitt(instance: number = 0, position, length, colorMsg: IColor) {
    sendToOSC(DeviceIPs.edtOut, [OSCDevices.EdtLed], [
        Modii.Kitt,
        position,
        length,
        colorMsg.hue,
    ]);
}

// /L/0
// 0 modus
// 0 start
// 127 end
// int 255 H
// int 255 S
// int 255 L
