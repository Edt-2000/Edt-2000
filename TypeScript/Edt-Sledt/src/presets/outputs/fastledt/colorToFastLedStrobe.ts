import { PresetLogic } from "../../presets-logic";
import { Actions$ } from "../../../../../Shared/actions/actions";
import { FastLedtStrobe } from "../../../outputs/edt-fastled";
import { modifiers } from "../../../../config/modifiers";
import { ModifierGroup } from "../../../../../Shared/actions/types";

export class ColorToFastLedStrobe extends PresetLogic {
    modifierOptions = {
        select: modifiers.strobeSpeeds,
        group: [ModifierGroup.FastLED, ModifierGroup.Color],
    };

    get mermaidConfig() {
        const modifier = modifiers.strobeSpeeds.find(
            ({ value: speed }) => speed === this.modifier,
        );

        return [
            {
                entry: `COLOR ${this.state ? `===>` : `--->`} STROBE${modifier ? `(${modifier.label})` : ""}`,
            },
            {
                subgraph: "FASTLEDS",
                entry: `STROBE ${this.state ? `===>` : "--->"} FASTLED`,
            },
        ];
    }

    protected _startPreset(): void {
        this.addSub(
            Actions$.singleColor.subscribe((color) => {
                FastLedtStrobe(0, this.modifier, color.h);
            }),
        );
    }

    protected _stopPreset(): void {
        // turn of strobe
        FastLedtStrobe(0, 0, 0);
    }
}
