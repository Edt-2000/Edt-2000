import {edtOutput} from '../../types';
import {Preset} from '../preset';
import {drumVideoTrigger} from './drumVideoTrigger';

enum VideosPresets {
    drumVideoTrigger = 1
}

export class Videos extends Preset implements edtOutput {
    constructor() {
        super();
        this.presets[VideosPresets[VideosPresets.drumVideoTrigger]] = new drumVideoTrigger();
        this.presetEnum = VideosPresets;
    }
}