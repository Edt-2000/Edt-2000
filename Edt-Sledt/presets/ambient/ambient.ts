import {edtOutput} from '../../types';
import {Preset} from '../preset';
import {GlitchLogo} from './glitchLogo';

enum AmbientPresets {
    GlitchLogo = 1
}

export class Ambient extends Preset implements edtOutput {
    constructor() {
        super();
        this.presets[AmbientPresets[AmbientPresets.GlitchLogo]] = new GlitchLogo();
        this.presetEnum = AmbientPresets;
    }
}