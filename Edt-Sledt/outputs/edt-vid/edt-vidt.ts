import {edtOutput} from "../../types";
import {backgroundChanger} from "./backgroundChanger";
import {preset} from "../preset";

enum edtVidtPresets {
    backgroundChanger = 1
}

export class edtVidt extends preset implements edtOutput {
    constructor() {
        super();
        this.presets[edtVidtPresets[edtVidtPresets.backgroundChanger]] = new backgroundChanger();
        this.presetEnum = edtVidtPresets;
    }
}