import { PresetLogic } from "../../presets-logic";
import { Actions$ } from "../../../../../Shared/actions/actions";
import { FastLedtRainbowSpark } from "../../../io/edt-fastled";
import { modifiers } from "../../../../config/modifiers";
import { ModifierGroup } from "../../../../../Shared/actions/types";
import { withLatestFrom } from "rxjs";

export class BeatToRainbowSpark extends PresetLogic {
    modifierOptions = {
        select: modifiers.fadeSpeeds,
        group: [ModifierGroup.FastLED, ModifierGroup.Beat],
    };

    get mermaidConfig() {
        const speed = modifiers.fadeSpeeds.find(
            ({ value }) => value === this.modifier,
        );
        return [
            {
                entry: `MAINBEAT ${this.state ? `==>|${(speed && (speed.label || speed.value)) || this.modifier}|` : "--->"} RAINBOW`,
            },
            {
                entry: `SINGLECOLOR ${this.state ? "===>" : "--->"} RAINBOW`,
            },
            {
                subgraph: "FASTLEDS",
                entry: `RAINBOW ${this.state ? "===>" : "--->"} FASTLED`,
            },
        ];
    }

    protected _startPreset(): void {
        this.addSub(
            Actions$.mainBeat
                .pipe(withLatestFrom(Actions$.singleColor))
                .subscribe(([, color]) => {
                    FastLedtRainbowSpark(0, this.modifier, color.h, 127);
                }),
        );
    }

    protected _stopPreset(): void {}
}
