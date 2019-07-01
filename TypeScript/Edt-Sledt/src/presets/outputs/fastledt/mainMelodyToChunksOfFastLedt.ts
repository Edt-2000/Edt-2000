import { PresetLogic } from '../../presets-logic';
import { Actions$ } from '../../../../../Shared/actions';
import { withLatestFrom } from 'rxjs/operators';
import { fastLedAmount } from '../../../../../Shared/config';
import { FastLedtSingleSolid } from '../../../outputs/edt-fastled';
import { ModifierGroup } from '../../../../../Shared/types';

export class MainMelodyToChunksOfFastLedt extends PresetLogic {
    modifierOptions = {
        select: [
            {label: '6-all', value: 2},
            {label: '12-all', value: 3},
            {label: '6-random', value: 5},
            {label: '12-random', value: 6},
        ],
        group: ModifierGroup.FastLED,
    };

    protected _startPreset(): void {
        this.addSub(
            Actions$.mainMelody
                .pipe(withLatestFrom(Actions$.singleColor))
                .subscribe(([note, color]) => {
                    for (
                        let ledStripIndex = 0;
                        ledStripIndex < fastLedAmount;
                        ledStripIndex++
                    ) {
                        const start = note.note;
                        FastLedtSingleSolid(
                            ledStripIndex + 1,
                            color,
                        );
                    }
                }),
        );
    }

    protected _stopPreset(): void {
    }
}
