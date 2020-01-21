import { rescale } from '../../../../../Shared/utils/utils';
import { PresetLogic } from '../../presets-logic';
import { Actions, Actions$, nextActionFromMsg } from '../../../../../Shared/actions/actions';
import { ModifierGroup } from '../../../../../Shared/actions/types';
import { IColor } from '../../../../../Shared/colors/types';

export class ColorToInverseVidtColor extends PresetLogic {
    modifierOptions = {
        group: [
            ModifierGroup.Color,
            ModifierGroup.Vidt,
        ],
    };

    protected _startPreset(): void {
        this.addSub(
            Actions$.singleColor.pipe().subscribe((color: IColor) => {
                const newColor: IColor = {
                    h: (color.h + rescale(63, 127, 0, 255)) % 255,
                    s: color.s,
                    b: color.b,
                };
                nextActionFromMsg(Actions.vidtSingleColor(newColor));
            }),
        );
    }

    protected _stopPreset(): void {
    }
}
