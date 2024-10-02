import { sendToOSC } from "../communication/osc";
import {
    DeviceIPs,
    Modii,
    OSCDevices,
    OSCDispedtOutPort,
} from "../../config/config";
import { IColor } from "../../../Shared/colors/types";

export function SpectacleColor(colorMsg: IColor) {
    sendToOSC(DeviceIPs.edtSpectacle, OSCDispedtOutPort, {
        addresses: [OSCDevices.EdtSpectacle],
        values: [Modii.SingleSolid, 0, 127, colorMsg.h, colorMsg.s, colorMsg.b],
    });
}
