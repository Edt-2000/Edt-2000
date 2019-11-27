import { IPresetMsg } from '../../../Shared/helpers/types';
import { automationChannel } from '../../../Shared/config';
import { Actions, Actions$ } from '../../../Shared/actions';
import { map } from 'rxjs/operators';
import { midiNoteAutomation$ } from '../communication/midi';

export const presetMidiMsg$ = Actions$.presetChange.pipe(
    map(({preset, modifier, state}: IPresetMsg) => ({
        channel: automationChannel,
        noteOn: state,
        note: preset,
        velocity: state ? modifier : 0,
    })),
);

export const presetChangeActions$ = midiNoteAutomation$.pipe(
    map(({note, noteOn, velocity}) => Actions.presetChange({
        preset: note,
        modifier: velocity,
        state: noteOn,
    })),
);
