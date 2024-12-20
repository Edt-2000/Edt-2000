import { PresetLogic } from "../../presets-logic";
import { Actions$ } from "../../../../../Shared/actions/actions";
import { FastLedtSpark } from "../../../io/edt-fastled";
import { modifiers } from "../../../../config/modifiers";
import { ModifierGroup } from "../../../../../Shared/actions/types";
import { blackColor } from "../../../../../Shared/colors/utils";
import { withLatestFrom } from "rxjs";

export class BeatToFastLedSpark extends PresetLogic {
    modifierOptions = {
        select: modifiers.fadeSpeeds,
        group: [ModifierGroup.FastLED, ModifierGroup.Color],
    };

    get mermaidConfig() {
        const speed = modifiers.fadeSpeeds.find(
            ({ value }) => value === this.modifier,
        );
        return [
            {
                entry: `MAINBEAT ${this.state ? `==>|${(speed && (speed.label || speed.value)) || this.modifier}|` : "--->"} SPARK`,
            },
            {
                entry: `SINGLECOLOR ${this.state ? "===>" : "--->"} SPARK`,
            },
            {
                subgraph: "FASTLEDS",
                entry: `SPARK ${this.state ? "===>" : "--->"} FASTLED`,
            },
        ];
    }

    protected _startPreset(): void {
        this.addSub(
            Actions$.mainBeat
                .pipe(withLatestFrom(Actions$.singleColor))
                .subscribe(([, color]) => {
                    FastLedtSpark(0, color, this.modifier);
                }),
        );
    }

    protected _stopPreset(): void {
        FastLedtSpark(0, blackColor, 0);
    }
}
