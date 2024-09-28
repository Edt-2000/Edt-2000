import { PresetLogic } from "../../presets-logic";
import {
    Actions,
    Actions$,
    nextActionFromMsg,
} from "../../../../../Shared/actions/actions";
import { ModifierGroup } from "../../../../../Shared/actions/types";
import { withLatestFrom } from "rxjs";

export class BeatToColor extends PresetLogic {
    modifierOptions = {
        group: [ModifierGroup.Color, ModifierGroup.Beat],
    };

    state = true;

    get mermaidConfig() {
        return [
            {
                entry: `BEAT ${this.state ? `===>` : "--->"} COLOR`,
            },
        ];
    }

    private index = -1;

    protected _startPreset(): void {
        this.addSub(
            Actions$.mainBeat
                .pipe(withLatestFrom(Actions$.colorPalette))
                .subscribe(([, colors]) => {
                    this.index = (this.index + 1) % colors.length;
                    nextActionFromMsg(Actions.singleColor(colors[this.index]));
                }),
        );
    }

    protected _stopPreset(): void {}
}
