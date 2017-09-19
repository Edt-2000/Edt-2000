import {sendToEdtOscDevice} from '../communication/osc';
import {colorMsg} from '../../../SharedTypes/socket';
import {rescale} from '../utils';
import {OSCDevices} from '../../../SharedTypes/config';

export function EdtLEDFlash(instance: number, start: number, end: number, duration: number, colorMsg: colorMsg) {
    sendToEdtOscDevice(OSCDevices.EdtLed, instance, [
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
    sendToEdtOscDevice(OSCDevices.EdtOnOff, instance, [
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
