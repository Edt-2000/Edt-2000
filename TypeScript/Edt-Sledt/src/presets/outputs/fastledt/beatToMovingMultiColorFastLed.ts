import {PresetLogic} from "../../presets-logic";
import {Actions$} from "../../../../../Shared/actions";
import {withLatestFrom} from "rxjs/operators";
import {fastLedAmount} from "../../../../../Shared/config";
import {FastLedtSingleSolid} from "../../../outputs/edt-fastled";
import {ModifierGroup} from "../../../../../Shared/types";

export class BeatToMovingMultiColorFastLed extends PresetLogic {
    modifierOptions = {
        select: [
            {label: 'left', value: 1},
            {label: 'right', value: 2},
            {label: 'cross-2', value: 3},
            {label: 'cross-3', value: 4},
        ],
        group: ModifierGroup.FastLED,
    };

    private startIndex = -1;

    protected _startPreset(): void {
        this.addSub(Actions$.mainBeat.pipe(
            withLatestFrom(Actions$.multiColor),
        )
            .subscribe(([, colors]) => {
                const rightNewIndex = (this.startIndex + 1) % colors.length;
                const leftNewIndex = Math.abs((this.startIndex - 1) % colors.length);
                switch (this.modifier) {
                    case 2:
                        this.startIndex = leftNewIndex;
                        break;
                    case 1:
                        this.startIndex = rightNewIndex;
                        break;
                    default:

                }

                for (let ledStripIndex = 0; ledStripIndex < fastLedAmount; ledStripIndex++) {
                    const ledStripColorIndex = (this.startIndex + ledStripIndex) % colors.length;
                    FastLedtSingleSolid(ledStripIndex + 1, colors[ledStripColorIndex]);
                }
            }));
    }

    protected _stopPreset(): void {
    }

}
