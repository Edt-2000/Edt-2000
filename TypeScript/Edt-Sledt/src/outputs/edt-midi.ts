import { IMidiNoteMsg } from '../../../Shared/helpers/types';
import { sendToOSC } from '../communication/osc';
import { DeviceIPs, MOSCIDIPort } from '../../../Shared/config';

export function sendToMidi(midiNoteMsg: IMidiNoteMsg) {
    // Send velocity (modifier) or 0 when noteOff
    sendToOSC(
        DeviceIPs.edtMOSCidi,
        MOSCIDIPort,
        ['midi', 'note'],
        [midiNoteMsg.channel, midiNoteMsg.note, midiNoteMsg.velocity],
    );
}
