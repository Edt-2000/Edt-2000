import { PresetLogic } from '../../presets-logic';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { withLatestFrom } from 'rxjs/operators';
import { FastLedtSingleSolid } from '../../../outputs/edt-fastled';
import { blackColor } from '../../../../../Shared/colors/utils';
import { ModifierGroup } from '../../../../../Shared/actions/types';

export class MainMelodyToChunksOfFastLedt extends PresetLogic {
    modifierOptions = {
        group: [
            ModifierGroup.FastLED,
            ModifierGroup.Melody,
        ],
    };

    protected _startPreset(): void {
        FastLedtSingleSolid(0, blackColor);

        this.addSub(
            Actions$.mainMelody
                .pipe(withLatestFrom(Actions$.singleColor))
                .subscribe(([note, color]) => {
                    const start = Math.floor((127 / 13) * note.noteNumber);
                    const end = Math.floor((127 / 13) * (note.noteNumber + 1));

                    FastLedtSingleSolid(0, blackColor);
                    FastLedtSingleSolid(
                        0,
                        color,
                        start,
                        end,
                    );
                }),
        );
    }

    protected _stopPreset(): void {
        FastLedtSingleSolid(0, blackColor);
    }
}
