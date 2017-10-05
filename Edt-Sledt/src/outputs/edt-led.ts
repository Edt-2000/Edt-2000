import {sendToOSC} from '../communication/osc';
import {colorMsg} from '../../../SharedTypes/socket';
import {rescale} from '../utils';
import {deviceIPs, OSCDevices} from '../../../SharedTypes/config';

export function EdtLEDFlash(instance: number = 0, start: number, end: number, duration: number, colorMsg: colorMsg) {
    sendToOSC(deviceIPs.tweedt, [OSCDevices.EdtLed, '0'], [
        3,
        start,
        end,
        rescale(colorMsg.color.hue, 360, 0, 255),
        rescale(colorMsg.color.saturation, 360, 0, 255),
        rescale(colorMsg.color.brightness, 360, 0, 255),
        duration
    ]);
}

export function EdtOnOff(instance: number = 0, duration: number) {
    sendToOSC(deviceIPs.tweedt, [OSCDevices.EdtOnOff, '0'], [
        1,
        255,
        255,
        255,
        255,
        255,
        duration
    ]);
}


// /L/0
// 0 modus
// 0 start
// 127 end
// int 255 H
// int 255 S
// int 255 L
