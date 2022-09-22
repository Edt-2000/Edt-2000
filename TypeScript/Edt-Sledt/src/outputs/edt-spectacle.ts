import { sendToOSC } from '../communication/osc';
import { DeviceIPs, Modii, OSCDevices, OSCDispedtOutPort } from '../../config/config';
import { IColor } from '../../../Shared/colors/types';

export function SpectacleColor(
    colorMsg: IColor,
    speed: number = 127,
) {
    sendToOSC(
        DeviceIPs.edtSpectacle,
        OSCDispedtOutPort,
        {
            addresses: [OSCDevices.EdtSpectacle],
            values: [
                Modii.SPECTACLE,
                speed,
                colorMsg.h,
                colorMsg.h,
            ],
        },
    );
}
