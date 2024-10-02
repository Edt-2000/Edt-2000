import { PresetLogic } from "../../presets-logic";
import { Actions$ } from "../../../../../Shared/actions/actions";
import { FastLedtSingleSolid } from "../../../io/edt-fastled";
import { ModifierGroup } from "../../../../../Shared/actions/types";
import { skip } from "rxjs";

export class ColorToFastLedSolid extends PresetLogic {
    modifierOptions = {
        group: [ModifierGroup.FastLED, ModifierGroup.Color],
    };

    get mermaidConfig() {
        return [
            {
                entry: `COLOR ${this.state ? `===>` : "--->"} SOLID`,
            },
            {
                subgraph: "FASTLEDS",
                entry: `SOLID ${this.state ? `===>` : "--->"} FASTLED`,
            },
        ];
    }

    protected _startPreset(): void {
        this.addSub(
            Actions$.singleColor.pipe(skip(1)).subscribe((color) => {
                FastLedtSingleSolid(0, color);
            }),
        );
    }

    protected _stopPreset(): void {}
}
