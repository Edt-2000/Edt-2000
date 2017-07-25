import {edtOutput} from "../../types";
import {bgColorCycle} from "./bgColorCycle";
import {preset} from "../preset";

enum edtVidtPresets {
    bgColorCycle = 1
}

export class edtVidt extends preset implements edtOutput {
    constructor() {
        super();
        this.presets[edtVidtPresets[edtVidtPresets.bgColorCycle]] = new bgColorCycle();
        this.presetEnum = edtVidtPresets;
    }
}