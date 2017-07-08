import {edtOutput, edtPresets} from "../types";

export class preset implements edtOutput {
    presets: edtPresets;
    presetEnum: {};

    constructor() {
        this.presets = {};
        this.presetEnum = {};
    }

    public log(): void {
        console.log('Preset objs', this.presets, this.presetEnum);
    }

    public initPreset(preset, velocity) {
        if(preset in this.presetEnum) this.presets[this.presetEnum[preset]].initPreset(velocity);
    }

    public destroyPreset(preset) {
        if(preset in this.presetEnum) this.presets[this.presetEnum[preset]].destroyPreset();
    }

}