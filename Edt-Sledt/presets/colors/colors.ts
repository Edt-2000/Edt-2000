import {edtOutput} from '../../types';
import {BgColorCycle} from './bgColorCycle';
import {Preset} from '../preset';
import {EdtLEDFollowVidt} from './edtLEDFollowVidt';

enum ColorsPresets {
    BgColorCycle = 1,
    EdtLEDFollowVidt = 2
}

export class Colors extends Preset implements edtOutput {
    constructor() {
        super();
        this.presets[ColorsPresets[ColorsPresets.BgColorCycle]] = new BgColorCycle();
        this.presets[ColorsPresets[ColorsPresets.EdtLEDFollowVidt]] = new EdtLEDFollowVidt();
        this.presetEnum = ColorsPresets;
    }
}