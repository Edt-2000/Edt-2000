import { PresetLogic } from '../../presets-logic';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { RGBLedtStrobe } from '../../../outputs/edt-rgbledt';
import { modifiers } from '../../../../config/modifiers';
import { ModifierGroup } from '../../../../../Shared/actions/types';

export class ColorStrobeRGBLed extends PresetLogic {
    modifierOptions = {
        select: modifiers.strobeSpeeds,
        group: [
            ModifierGroup.Color,
            ModifierGroup.RGBLED,
        ],
    };

    protected _startPreset(): void {
        this.addSub(
            Actions$.singleColor.subscribe(color => {
                RGBLedtStrobe(0, this.modifier, color.h);
            }),
        );
    }

    protected _stopPreset(): void {
        // turn of strobe
        RGBLedtStrobe(0, 0, 0);
    }
}
