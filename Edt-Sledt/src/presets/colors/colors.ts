import {edtOutput} from '../../types';
import {BgColorCycle} from './bgColorCycle';
import {Preset} from '../preset';
import {EdtLEDFollowColor} from './edtLEDFollowColor';
import {EdtVidtFollowColor} from './edtVidtFollowColor';
import {edtOnOffsBlinkOnColorChange} from './edtOnOffsBlinkOnColorChange';

enum ColorsPresets {
    BgColorCycle = 1,
    EdtLEDFollowColor = 10,
    EdtVidtFollowColor = 11,
    edtOnOffsBlinkOnColorChange = 12
}

export class Colors extends Preset implements edtOutput {
    constructor() {
        super();
        this.presets[ColorsPresets[ColorsPresets.BgColorCycle]] = new BgColorCycle();
        this.presets[ColorsPresets[ColorsPresets.EdtLEDFollowColor]] = new EdtLEDFollowColor();
        this.presets[ColorsPresets[ColorsPresets.EdtVidtFollowColor]] = new EdtVidtFollowColor();
        this.presets[ColorsPresets[ColorsPresets.edtOnOffsBlinkOnColorChange]] = new edtOnOffsBlinkOnColorChange();
        this.presetEnum = ColorsPresets;
    }
}
