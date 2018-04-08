import {DeviceIPs, Modii, OSCDevices} from '../../../Shared/config';
import {IColor} from '../../../Shared/socket';
import {sendToOSC} from '../communication/osc';

export function EdtLEDSpark(instance: number, start: number, end: number, duration: number, colorMsg: IColor) {

    sendToOSC(DeviceIPs.edtOut, [OSCDevices[OSCDevices.EdtLed]], [
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

    sendToOSC(DeviceIPs.edtOut, [OSCDevices[OSCDevices.EdtLed]], [
        Modii.RainbowSolid,
        start,
        end,
        colorMsg.hue,
        deltaHue,
    ]);
}

export function EdtKitt(instance: number = 0, position, length, colorMsg: IColor) {
    sendToOSC(DeviceIPs.edtOut, [OSCDevices[OSCDevices.EdtLed]], [
        Modii.Kitt,
        position,
        length,
        colorMsg.hue,
    ]);
}
