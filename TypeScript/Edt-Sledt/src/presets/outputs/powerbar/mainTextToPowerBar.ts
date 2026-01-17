import { PresetLogic } from "../../presets-logic";
import { Actions$ } from "../../../../../Shared/actions/actions";
import { modifiers } from "../../../../config/modifiers";
import { ModifierGroup } from "../../../../../Shared/actions/types";
import { withLatestFrom } from "rxjs";
import { sendToPowerbar } from "../../../io/edt-powerbar";

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
                    sendToPowerbar({
                        animation: "glitchText",
                        texts: [mainText],
                        variant: 1,
                        flashCount: 1,
                        colors: [color],
                        speed: 255,
                        font: 1,
                        brightness: 255,
                    });
                }),
        );
    }

    protected _stopPreset(): void {}
}
