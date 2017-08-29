import {sendToEdtOscDevice} from '../communication/osc';
import {colorMsg} from '../../../SharedTypes/socket';
import {rescale} from '../utils';
import {OSCDevices} from '../../../SharedTypes/config';

/**
 *
 * @param {number} instance
 * @param {number} start
 * @param {number} end
 * @param duration
 * @param {colorMsg} colorMsg
 * @constructor
 */
export function EdtLEDFlash(instance: number = 0, start: number, end: number, duration: number, colorMsg: colorMsg) {
    sendToEdtOscDevice(OSCDevices.EdtLed, instance, [
        2,
        start,
        end,
        rescale(colorMsg.bgColor.hue, 360, 0, 255),
        rescale(colorMsg.bgColor.saturation, 360, 0, 255),
        rescale(colorMsg.bgColor.brightness, 360, 0, 255),
        10
    ]);
}


// /TP/*
// 0 start
// 1 modus
// 127 end
// int 255 H
// int 255 S
// int 255 L
