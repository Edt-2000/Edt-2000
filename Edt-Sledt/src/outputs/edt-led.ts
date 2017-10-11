import {DeviceIPs, OSCDevices} from '../../../SharedTypes/config';
import {IColor} from '../../../SharedTypes/socket';
import {sendToOSC} from '../communication/osc';
import {rescale} from '../utils';

export function EdtLEDFlash(instance: number = 0, start: number, end: number, duration: number, colorMsg: IColor) {
    sendToOSC(DeviceIPs.tweedt, [OSCDevices.EdtLed, instance.toString()], [
        3,
        start,
        end,
        rescale(colorMsg.hue, 360, 0, 255),
        rescale(colorMsg.saturation, 360, 0, 255),
        rescale(colorMsg.brightness, 360, 0, 255),
        duration,
    ]);
}

export function EdtOnOff(instance: number = 0, duration: number) {
    sendToOSC(DeviceIPs.tweedt, [OSCDevices.EdtOnOff, instance.toString()], [
        1,
        255,
        255,
        255,
        255,
        255,
        duration,
    ]);
}

// /L/0
// 0 modus
// 0 start
// 127 end
// int 255 H
// int 255 S
// int 255 L
