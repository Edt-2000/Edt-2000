import { automationNoteOnOff$ } from '../communication/midi';
import { map } from 'rxjs/operators';
import { IPresetMsg } from '../../../Shared/types';
import { Observable } from 'rxjs';
import { sendToOSC } from '../communication/osc';
import { automationChannel, DeviceIPs, MOSCIDIPort } from '../../../Shared/config';

export const midiPresetChange$: Observable<IPresetMsg> = automationNoteOnOff$.pipe(
    map(note => {
        return {
            preset: note.note,
            modifier: note.velocity,
            state: note.noteOn,
        };
    }),
);

export function sendMidiPresetChange({preset, modifier, state}: IPresetMsg) {
    // Send velocity (modifier) or 0 when noteOff
    sendToOSC(
        DeviceIPs.edtMOSCidi,
        MOSCIDIPort,
        ['midi', 'note'],
        [automationChannel, preset, state ? modifier : 0],
    );
}
