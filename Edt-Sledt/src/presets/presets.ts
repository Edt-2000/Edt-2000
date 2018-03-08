import {presets} from '../../../SharedTypes/presets';

export interface IEdtPresetLogic {
    startPreset(velocity: number): void;
    stopPreset(): void;
}

export const edtPresets = new Map<number, {
    preset: IEdtPresetLogic;
    active: boolean;
}>();

Object.keys(presets).map((key) => edtPresets.set(+key, {
    preset: presets[key],
    active: false
}));
