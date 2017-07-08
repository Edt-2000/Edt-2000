import {edtOutput, edtPresets} from "../types";

export class preset implements edtOutput {
    presets: edtPresets;
    presetEnum: {};

    constructor() {
        this.presets = {};
        this.presetEnum = {};
    }

    public initPreset(preset, velocity) {
        if(preset in this.presetEnum) {
            console.log(`Preset ${this.presetEnum[preset]} activated with velocity ${velocity}!`);
            this.presets[this.presetEnum[preset]].initPreset(velocity);
        }
    }

    public destroyPreset(preset) {
        if(preset in this.presetEnum) {
            console.log(`Preset ${this.presetEnum[preset]} de-activated!`);
            this.presets[this.presetEnum[preset]].destroyPreset();
        }
    }

}