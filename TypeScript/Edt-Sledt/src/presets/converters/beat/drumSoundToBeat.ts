import { PresetLogic } from "../../presets-logic";
import {
    Actions,
    Actions$,
    nextActionFromMsg,
} from "../../../../../Shared/actions/actions";
import { modifiers } from "../../../../config/modifiers";
import { ModifierGroup } from "../../../../../Shared/actions/types";
import { filter } from "rxjs";

import { DrumSounds } from "../../../../../Shared/midi/types";

export class DrumSoundToBeat extends PresetLogic {
    modifierOptions = {
        select: modifiers.drumSounds,
        group: [ModifierGroup.Drums, ModifierGroup.Beat],
    };

    get mermaidConfig() {
        return modifiers.drumSounds
            .map((sound) => {
                return [
                    {
                        entry: `${sound.label.toUpperCase()} ${sound.value === this.modifier ? "===>" : "--->"} MAINBEAT`,
                    },
                    {
                        entry: `class ${sound.label.toUpperCase()} node__${sound.label.toUpperCase()}`,
                    },
                ];
            })
            .flat();
    }

    protected _startPreset(): void {
        this.addSub(
            Actions$.mainDrumSound
                .pipe(
                    filter(({ sound }) => DrumSounds[sound] === this.modifier),
                )
                .subscribe(({ velocity }) => {
                    nextActionFromMsg(Actions.mainBeat(velocity));
                }),
        );
    }

    protected _stopPreset(): void {}
}
