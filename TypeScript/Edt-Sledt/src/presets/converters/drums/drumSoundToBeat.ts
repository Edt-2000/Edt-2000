import { PresetLogic } from "../../presets-logic";
import { Actions, Actions$, nextActionFromMsg } from "../../../../../Shared/actions";
import { filter } from "rxjs/operators";
import { DrumSounds } from "../../../../../Shared/drums";
import { ModifierGroup } from "../../../../../Shared/types";

export class DrumSoundToBeat extends PresetLogic {
    modifierOptions = {
        select: Object.keys(DrumSounds)
            .filter(entry => isNaN(+entry)) // Filter out numeric entries of enum
            .map(sound => {
                return {
                    label: sound,
                    value: DrumSounds[sound],
                };
            }),
        group: ModifierGroup.Drums,
    };

    protected _startPreset(): void {
        this.addSub(
            Actions$.mainDrumSound
                .pipe(filter(drum => drum === this.modifier))
                .subscribe(beat => {
                    nextActionFromMsg(Actions.mainBeat(beat));
                }),
        );
    }

    protected _stopPreset(): void {
    }
}
