import { PresetLogic } from "../../presets-logic";
import {
    Actions,
    Actions$,
    nextActionFromMsg,
} from "../../../../../Shared/actions/actions";
import { ModifierGroup } from "../../../../../Shared/actions/types";
import { withLatestFrom } from "rxjs";

export class BeatToNextWord extends PresetLogic {
    modifierOptions = {
        group: [ModifierGroup.Vidt, ModifierGroup.Words, ModifierGroup.Beat],
    };

    get mermaidConfig() {
        return [
            {
                entry: `MAINBEAT ${this.state ? `===>` : "--->"} WORD`,
            },
        ];
    }

    private index = -1;

    protected _startPreset(): void {
        this.addSub(
            Actions$.mainBeat
                .pipe(withLatestFrom(Actions$.contentGroup))
                .subscribe(([, { wordSet }]) => {
                    this.index = (this.index + 1) % wordSet.length;
                    nextActionFromMsg(Actions.mainText(wordSet[this.index]));
                }),
        );
    }

    protected _stopPreset(): void {}
}
