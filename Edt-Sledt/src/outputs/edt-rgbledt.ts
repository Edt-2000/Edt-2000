import {DeviceIPs, Modii, OSCDevices,} from '../../../Shared/config';
import {IColor} from '../../../Shared/socket';
import {sendToOSC} from "../communication/osc";

export function RGBLedtSingleSolid(instance: number = 0, colorMsg: IColor) {
    sendToOSC(DeviceIPs.edtcUDosPBUS, [OSCDevices.EdtRGBLed, '?'], [
        Modii.SingleSolid,
        0,
        127,
        colorMsg.hue,
        colorMsg.saturation,
        colorMsg.brightness,
    ]);
}
