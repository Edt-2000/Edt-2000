import {edtOutput, edtPresets} from "../types";

export class Preset implements edtOutput {
    presets: edtPresets;
    presetEnum: {};

    constructor() {
        this.presets = {};
        this.presetEnum = {};
    }

    public initPreset(preset, velocity) {
        if(preset in this.presetEnum) {
            console.log(`Preset ${this.presetEnum[preset]} activated with velocity ${velocity}!`);
            this.presets[this.presetEnum[preset]].stopPreset(); // Always ensure to cleanup first in case this gets called twice
            this.presets[this.presetEnum[preset]].startPreset(velocity);
        }
    }

    public destroyPreset(preset) {
        if(preset in this.presetEnum) {
            console.log(`Preset ${this.presetEnum[preset]} de-activated!`);
            this.presets[this.presetEnum[preset]].stopPreset();
        }
    }

}
