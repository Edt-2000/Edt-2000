import { PresetLogic } from '../../presets-logic';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { withLatestFrom } from 'rxjs/operators';
import { FastLedtSingleSolid } from '../../../outputs/edt-fastled';
import { ModifierGroup } from '../../../../../Shared/types';
import { BlackColor } from '../../../../../Shared/config';

export class MainMelodyToChunksOfFastLedt extends PresetLogic {
    modifierOptions = {
        group: [
            ModifierGroup.FastLED,
            ModifierGroup.Melody,
        ],
    };

    protected _startPreset(): void {
        FastLedtSingleSolid(0, BlackColor);

        this.addSub(
            Actions$.mainMelody
                .pipe(withLatestFrom(Actions$.singleColor))
                .subscribe(([note, color]) => {
                    const start = Math.floor((127 / 13) * note.noteNumber);
                    const end = Math.floor((127 / 13) * (note.noteNumber + 1));

                    FastLedtSingleSolid(0, BlackColor);
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
        FastLedtSingleSolid(0, BlackColor);
    }
}
