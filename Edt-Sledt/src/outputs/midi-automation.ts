import {Actions$} from '../../../Shared/actions';
import {sendMIDICC, sendMIDIPreset} from '../communication/midi';
import {automationChannel} from '../../../Shared/config';

Actions$.presetChange.subscribe(sendMIDIPreset);

Actions$.singleColor.subscribe(color => {
    sendMIDICC({
        channel: automationChannel,
        controller: 1, // TODO make a map of CC to actions
        value: Math.round(color.hue / 3),
    });
});

export const MidiAutomationOutput = 'MidiAutomationOutput';
