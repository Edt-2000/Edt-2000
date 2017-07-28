import {edtOutput} from "../../types";
import {BgColorCycle} from "./bgColorCycle";
import {Preset} from "../preset";
import {drumVideoTrigger} from '../videos/drumVideoTrigger';

enum ColorsPresets {
    bgColorCycle = 1,
    drumVideoTrigger = 2
}

export class Colors extends Preset implements edtOutput {
    constructor() {
        super();
        this.presets[ColorsPresets[ColorsPresets.bgColorCycle]] = new BgColorCycle();
        this.presets[ColorsPresets[ColorsPresets.drumVideoTrigger]] = new drumVideoTrigger();
        this.presetEnum = ColorsPresets;
    }
}