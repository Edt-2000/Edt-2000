import { IPresetMsg } from '../../../Shared/helpers/types';
import { sendToOSC } from '../communication/osc';
import { automationChannel, DeviceIPs, MOSCIDIPort } from '../../../Shared/config';

export function sendMidiPresetChange({preset, modifier, state}: IPresetMsg) {
    sendToOSC(
        DeviceIPs.edtMOSCidi,
        MOSCIDIPort,
        {
            addresses: ['midi', 'note'],
            // Send velocity (modifier) or 0 when noteOff
            values: [automationChannel, preset, state ? modifier : 0],
        },
    );
}
