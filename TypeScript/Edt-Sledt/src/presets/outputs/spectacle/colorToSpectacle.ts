import { PresetLogic } from '../../presets-logic';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { MermaidConfig, ModifierGroup } from '../../../../../Shared/actions/types';
import { SpectacleColor } from '../../../outputs/edt-spectacle';
import { modifiers } from '../../../../config/modifiers';
import { ColorVariations } from '../../../../config/config';
import { rescale } from '../../../../../Shared/utils/utils';

export class ColorToSpectacle extends PresetLogic {
    mermaidConfig: MermaidConfig[];
    modifierOptions = {
        select: modifiers.colorVariation,
        group: [
            ModifierGroup.FX,
        ],
    };

    protected _startPreset(): void {
        this.addSub(
            Actions$.singleColor.subscribe(color => {
                const newColor = (this.modifier === ColorVariations.inverse ? {
                    h: (color.h + rescale(63, 127, 0, 255)) % 255,
                    s: color.s,
                    b: color.b,
                } : color);
                SpectacleColor(newColor);
            }),
        );
    }

    protected _stopPreset(): void {
    }
}
