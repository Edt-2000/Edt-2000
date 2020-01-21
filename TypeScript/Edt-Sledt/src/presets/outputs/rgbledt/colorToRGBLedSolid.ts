import { PresetLogic } from '../../presets-logic';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { RGBLedtSingleSolid } from '../../../outputs/edt-rgbledt';
import { skip } from 'rxjs/operators';
import { ModifierGroup } from '../../../../../Shared/types';

export class ColorToRGBLedSolid extends PresetLogic {
    modifierOptions = {
        group: [
            ModifierGroup.Color,
            ModifierGroup.RGBLED,
        ],
    };

    protected _startPreset(): void {
        this.addSub(
            Actions$.singleColor.pipe(skip(1)).subscribe(color => {
                RGBLedtSingleSolid(0, color);
            }),
        );
    }

    protected _stopPreset(): void {
    }
}
