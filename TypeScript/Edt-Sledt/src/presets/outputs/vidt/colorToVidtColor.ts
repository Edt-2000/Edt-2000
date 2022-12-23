import { PresetLogic } from '../../presets-logic';
import { Actions, Actions$, nextActionFromMsg } from '../../../../../Shared/actions/actions';
import { ModifierGroup } from '../../../../../Shared/actions/types';
import { modifiers } from '../../../../config/modifiers';
import { ColorVariations } from '../../../../config/config';
import { rescale } from '../../../../../Shared/utils/utils';

export class ColorToVidtColor extends PresetLogic {
    modifierOptions = {
        select: modifiers.colorVariation,
        group: [
            ModifierGroup.Vidt,
            ModifierGroup.Color,
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
                nextActionFromMsg(Actions.vidtSingleColor(newColor));
            }),
        );
        this.addSub(
            Actions$.multiColor.subscribe(color => {
                nextActionFromMsg(Actions.vidtMultiColor(color));
            }),
        );
    }

    protected _stopPreset(): void {
    }
}
