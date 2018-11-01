import {PresetLogic} from '../../presets-logic';
import {Actions, Actions$, nextActionFromMsg} from '../../../../../Shared/actions';
import {modifiers} from "../../../../../Shared/modifiers";
import {filter} from "rxjs/operators";

export class DrumSoundToBeat extends PresetLogic {
    modifierOptions = {
        select: modifiers.drumSounds,
    };

    protected _startPreset(): void {
        this.addSub(Actions$.mainDrum.pipe(
            filter(drum => drum === this.modifier)
        )
            .subscribe((beat) => {
                nextActionFromMsg(Actions.mainBeat(beat));
            }));
    }

    protected _stopPreset(): void {
    }
}
