import { PresetLogic } from "../../presets-logic";
import { Actions$ } from "../../../../../Shared/actions";
import { map, withLatestFrom } from "rxjs/operators";
import { fastLedAmount } from "../../../../../Shared/config";
import { FastLedtSingleSolid } from "../../../outputs/edt-fastled";
import { ModifierGroup } from "../../../../../Shared/types";

export class BeatToMovingMultiColorFastLed extends PresetLogic {
    modifierOptions = {
        select: [
            { label: "left", value: 1 },
            { label: "right", value: 2 },
        ],
        group: ModifierGroup.FastLED,
    };

    startIndex = 0;

    protected _startPreset(): void {
        this.addSub(
            Actions$.mainBeat
                .pipe(
                    map(() => {
                        switch (this.modifier) {
                            case 1:
                                return -1;
                            case 2:
                                return 1;
                            default:
                                return 1;
                        }
                    }),
                    withLatestFrom(Actions$.multiColor),
                )
                .subscribe(([direction, colors]) => {
                    // If color length has changed, reset index
                    this.startIndex = (this.startIndex > colors.length)
                        ? 0
                        : Math.abs((this.startIndex + direction) % colors.length);
                    for (
                        let ledStripIndex = 0;
                        ledStripIndex < fastLedAmount;
                        ledStripIndex++
                    ) {
                        const ledStripColorIndex = Math.abs((this.startIndex + ledStripIndex) % colors.length);
                        FastLedtSingleSolid(
                            ledStripIndex + 1, // LED strips start at 1
                            colors[ledStripColorIndex],
                        );
                    }
                }),
        );
    }

    protected _stopPreset(): void {
    }
}
