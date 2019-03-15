import {PresetLogic} from '../../presets-logic';
import {Actions$} from '../../../../../Shared/actions';
import {FastLedtStrobe,} from '../../../outputs/edt-fastled';
import {modifiers} from "../../../../../Shared/modifiers";
import {ModifierGroup} from "../../../../../Shared/types";

export class ColorStrobeFastLed extends PresetLogic {
    modifierOptions = {
        select: modifiers.strobeSpeeds,
        group: ModifierGroup.FastLED,
    };

    protected _startPreset(): void {
        this.addSub(Actions$.singleColor.subscribe((color) => {
            FastLedtStrobe(0, this.modifier, color.h);
        }));
    }

    protected _stopPreset(): void {
        // turn of strobe
        FastLedtStrobe(0, 0, 0);
    }

}
