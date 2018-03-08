import {Note, presetMidi$} from '../inputs/midi';
import {presets} from '../../../SharedTypes/presets';

export interface IEdtPresetLogic {
    startPreset(velocity: number): void;
    stopPreset(): void;
}

export const edtPresets = new Map<Note, {
    preset: IEdtPresetLogic;
    active: boolean;
}>();

export const preset$ = presetMidi$
    .filter((msg) => edtPresets.has(msg.preset));

// Loop and set all presets
Object.keys(presets).map((key) => edtPresets.set(Note[key], {
    preset: presets[key],
    active: false
}));
