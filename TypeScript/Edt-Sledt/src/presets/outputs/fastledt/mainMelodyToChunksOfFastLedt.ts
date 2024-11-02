import { PresetLogic } from "../../presets-logic";
import { Actions$ } from "../../../../../Shared/actions/actions";
import { FastLedtSingleSolid } from "../../../io/edt-fastled";
import { blackColor } from "../../../../../Shared/colors/utils";
import { ModifierGroup } from "../../../../../Shared/actions/types";
import { withLatestFrom } from "rxjs";

export class MainMelodyToChunksOfFastLedt extends PresetLogic {
    modifierOptions = {
        group: [ModifierGroup.FastLED, ModifierGroup.Melody],
    };

    get mermaidConfig() {
        return [
            {
                entry: `Melody ${this.state ? `===>` : "--->"} CHUNKS`,
            },
            {
                subgraph: "FASTLEDS",
                entry: `CHUNKS ${this.state ? `===>` : "--->"} FASTLED`,
            },
            {
                entry: `SINGLECOLOR ${this.state ? `===>` : "--->"} CHUNKS`,
            },
        ];
    }

    protected _startPreset(): void {
        FastLedtSingleSolid(0, blackColor);

        this.addSub(
            Actions$.mainMelody
                .pipe(withLatestFrom(Actions$.singleColor))
                .subscribe(([note, color]) => {
                    const start = Math.floor((127 / 13) * note.noteNumber);
                    const end = Math.floor((127 / 13) * (note.noteNumber + 1));

                    FastLedtSingleSolid(0, blackColor);
                    FastLedtSingleSolid(0, color, start, end);
                }),
        );
    }

    protected _stopPreset(): void {
        FastLedtSingleSolid(0, blackColor);
    }
}
