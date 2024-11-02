import { Actions, Actions$ } from "../../../Shared/actions/actions";
import { midiNoteAutomation$ } from "../communication/midi";
import { automationChannel } from "../../config/config";
import { IPresetMsg } from "../../../Shared/actions/types";
import { map } from "rxjs";

export const presetMidiMsg$ = Actions$.presetChange.pipe(
    map(({ preset, modifier, state }: IPresetMsg) => ({
        channel: automationChannel,
        noteOn: state,
        note: preset,
        velocity: state ? modifier : 0,
    })),
);

export const presetChangeActions$ = midiNoteAutomation$.pipe(
    map(({ note, noteOn, velocity }) =>
        Actions.presetChange({
            preset: note,
            modifier: velocity,
            state: noteOn,
        }),
    ),
);
