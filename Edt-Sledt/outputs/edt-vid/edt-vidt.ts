import {edtOutput} from "../../types";
import {bgDrumCycle} from "./bgDrumCycle";
import {preset} from "../preset";

enum edtVidtPresets {
    bgDrumCycle = 1
}

export class edtVidt extends preset implements edtOutput {
    constructor() {
        super();
        this.presets[edtVidtPresets[edtVidtPresets.bgDrumCycle]] = new bgDrumCycle();
        this.presetEnum = edtVidtPresets;
    }
}