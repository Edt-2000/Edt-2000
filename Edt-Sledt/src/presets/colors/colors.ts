import {edtOutput} from '../../types';
import {BgColorCycle} from './bgColorCycle';
import {Preset} from '../preset';
import {EdtLEDFollowColor} from './edtLEDFollowColor';
import {EdtVidtFollowColor} from './edtVidtFollowColor';

enum ColorsPresets {
    BgColorCycle = 1,
    EdtLEDFollowVidt = 2,
    EdtVidtFollowColor = 3
}

export class Colors extends Preset implements edtOutput {
    constructor() {
        super();
        this.presets[ColorsPresets[ColorsPresets.BgColorCycle]] = new BgColorCycle();
        this.presets[ColorsPresets[ColorsPresets.EdtLEDFollowVidt]] = new EdtLEDFollowColor();
        this.presets[ColorsPresets[ColorsPresets.EdtVidtFollowColor]] = new EdtVidtFollowColor();
        this.presetEnum = ColorsPresets;
    }
}