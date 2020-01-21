import { Actions, Actions$ } from '../../../Shared/actions/actions';
import { map } from 'rxjs/operators';
import { midiNoteAutomation$ } from '../communication/midi';
import { automationChannel } from '../../config/config';
import { IPresetMsg } from '../../../Shared/actions/types';

export const presetMidiMsg$ = Actions$.presetChange.pipe(
    map(({preset, modifier, state}: IPresetMsg) => ({
        channel: automationChannel,
        noteOn: state,
        note: preset,
        velocity: state ? modifier : 0,
        fromMidiInput: false,
    })),
);

export const presetChangeActions$ = midiNoteAutomation$.pipe(
    map(({note, noteOn, velocity}) => Actions.presetChange({
        preset: note,
        modifier: velocity,
        state: noteOn,
    })),
);
