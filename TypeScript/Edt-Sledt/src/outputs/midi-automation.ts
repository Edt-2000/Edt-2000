import { Actions$ } from '../../../Shared/actions';
import { sendMIDIPreset } from '../communication/midi';

Actions$.presetChange.subscribe(sendMIDIPreset);

// Actions$.singleColor.subscribe(color => {
//     sendMIDICC({
//         channel: automationChannel,
//         controller: 1, // TODO make a map of CC to actions
//         value: Math.round(color.h / 3),
//     });
// });

export const MidiAutomationOutput = 'MidiAutomationOutput';
