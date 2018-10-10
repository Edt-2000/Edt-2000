import {PresetLogic} from "../../presets-logic";
import {Actions$} from "../../../../../Shared/actions";
import {withLatestFrom} from "rxjs/operators";
import {fastLedAmount} from "../../../../../Shared/config";
import {FastLedtSingleSolid} from "../../../outputs/edt-fastled";

export class BeatToMovingMultiColorFastLed extends PresetLogic {
    modifierOptions = {
        select: [
            {label: 'left', value: 1},
            {label: 'right', value: 2},
        ]
    };

    private startIndex = -1;

    protected _startPreset(): void {
        this.addSub(Actions$.mainBeat.pipe(
            withLatestFrom(Actions$.multiColor),
        )
            .subscribe(([, colors]) => {
                // Loop around the startIndex to get the moving effect (left or right)
                this.startIndex = (this.startIndex + 1) % colors.length;

                for (let ledStripIndex = 0; ledStripIndex < fastLedAmount; ledStripIndex++) {
                    const ledStripColorIndex = (this.startIndex + ledStripIndex) % colors.length;
                    FastLedtSingleSolid(ledStripIndex + 1, colors[ledStripColorIndex]);
                }
            }));
    }

    protected _stopPreset(): void {
    }

}
