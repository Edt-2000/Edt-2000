import { IMidiNoteMsg, IOSCMessage } from '../../../Shared/helpers/types';
import { sendToOSC } from '../communication/osc';
import { DeviceIPs, MOSCIDIPort } from '../../../Shared/config';
import { Subject } from 'rxjs';

export const loopbackOSCMidi$ = new Subject<IOSCMessage>();

export function sendToMidi(midiNoteMsg: IMidiNoteMsg) {
    // Send velocity (modifier) or 0 when noteOff
    sendToOSC(
        DeviceIPs.edtMOSCidi,
        MOSCIDIPort,
        ['midi', 'note'],
        [midiNoteMsg.channel, midiNoteMsg.note, midiNoteMsg.velocity],
    );
    loopbackOSCMidi$.next({
        addresses: ['midi', 'note'],
        values: [midiNoteMsg.channel, midiNoteMsg.note, midiNoteMsg.velocity],
    });
}
