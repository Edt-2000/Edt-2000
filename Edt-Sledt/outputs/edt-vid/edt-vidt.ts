import {edtOutput, edtPresets} from "../../types";
import {backgroundChanger} from "./backgroundChanger";
import {preset} from "../preset";
const socket = require('../../modules/socket');

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