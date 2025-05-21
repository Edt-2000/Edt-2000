import { PresetLogic } from "../../presets-logic";
import { Actions$ } from "../../../../../Shared/actions/actions";
import { FastLedtSpark } from "../../../io/edt-fastled";
import { modifiers } from "../../../../config/modifiers";
import { ModifierGroup } from "../../../../../Shared/actions/types";
import { blackColor } from "../../../../../Shared/colors/utils";
import { withLatestFrom } from "rxjs";
import { powerBarSocket } from "../../../io/edt-powerbar";

export class MainTextToPowerBar extends PresetLogic {
    modifierOptions = {
        group: [ModifierGroup.PowerBar],
    };

    get mermaidConfig() {
        const speed = modifiers.fadeSpeeds.find(
            ({ value }) => value === this.modifier,
        );
        return [
            {
                entry: `WORD ${this.state ? `==>` : "--->"} POWERBAR`,
            },
        ];
    }

    protected _startPreset(): void {
        this.addSub(
            Actions$.mainText
                .pipe(withLatestFrom(Actions$.singleColor))
                .subscribe(([mainText, color]) => {
                    powerBarSocket.send(
                        JSON.stringify({
                            animation: "glitchText",
                            texts: [mainText],
                            variant: 1,
                            flashCount: 1,
                            colors: [color],
                            speed: 255,
                            font: 1,
                            brightness: 255,
                        }),
                    );
                }),
        );
    }

    protected _stopPreset(): void {}
}
