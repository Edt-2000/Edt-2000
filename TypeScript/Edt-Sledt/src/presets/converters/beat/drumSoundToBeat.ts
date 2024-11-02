import { PresetLogic } from "../../presets-logic";
import {
    Actions,
    Actions$,
    nextActionFromMsg,
} from "../../../../../Shared/actions/actions";
import { modifiers } from "../../../../config/modifiers";
import { ModifierGroup } from "../../../../../Shared/actions/types";
import { filter } from "rxjs";

export class DrumSoundToBeat extends PresetLogic {
    modifierOptions = {
        select: modifiers.drumSounds,
        group: [ModifierGroup.Drums, ModifierGroup.Beat],
    };

    get mermaidConfig() {
        const activeDrumSound = modifiers.drumSounds.find(
            (sound) => sound.value === this.modifier,
        );
        return this.state && activeDrumSound
            ? [{ entry: `${activeDrumSound.label} ===> BEAT` }]
            : [];
    }

    protected _startPreset(): void {
        this.addSub(
            Actions$.mainDrumSound
                .pipe(filter((drum) => drum === this.modifier))
                .subscribe((beat) => {
                    nextActionFromMsg(Actions.mainBeat(beat));
                }),
        );
    }

    protected _stopPreset(): void {}
}
