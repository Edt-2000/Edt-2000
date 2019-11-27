import { PresetLogic } from '../../presets-logic';
import { Actions$ } from '../../../../../Shared/actions';
import { FastLedtSpark } from '../../../outputs/edt-fastled';
import { modifiers } from '../../../../../Shared/modifiers';
import { withLatestFrom } from 'rxjs/operators';
import { ModifierGroup } from '../../../../../Shared/helpers/types';

export class BeatToFastLedSpark extends PresetLogic {
    modifierOptions = {
        select: modifiers.fadeSpeeds,
        group: [
            ModifierGroup.FastLED,
            ModifierGroup.Color,
        ],
    };

    protected _startPreset(): void {
        this.addSub(
            Actions$.mainBeat.pipe(
                withLatestFrom(Actions$.singleColor),
            ).subscribe(([beat, color]) => {
                FastLedtSpark(0, color, this.modifier);
            }),
        );
    }

    protected _stopPreset(): void {
    }
}
