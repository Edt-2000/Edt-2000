import {Note, presetMidi$} from '../inputs/midi';
import {presets} from '../../../SharedTypes/presets';
import {filter, tap} from 'rxjs/operators';

export interface IEdtPresetLogic {
    startPreset(velocity: number): void;
    stopPreset(): void;
}

export const edtPresets = new Map<number, {
    preset: IEdtPresetLogic;
    active: boolean;
}>();

export const preset$ = presetMidi$
    .pipe(
        filter((msg) => edtPresets.has(msg.preset)),
    );

// Loop and set all presets
Object.keys(presets).map((key) => edtPresets.set(+key, {
    preset: presets[key],
    active: false
}));
