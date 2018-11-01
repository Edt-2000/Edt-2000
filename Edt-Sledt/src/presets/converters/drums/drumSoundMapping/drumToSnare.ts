import {PresetLogic} from '../../../presets-logic';
import {modifiers} from "../../../../../../Shared/modifiers";
import {drumTriggerOn$} from "../../../../inputs/music-triggers";
import {filter} from "rxjs/operators";
import {Actions, nextActionFromMsg} from "../../../../../../Shared/actions";
import {DrumSounds} from "../../../../../../Shared/drums";

export class DrumToSnare extends PresetLogic {
    modifierOptions = {
        select: modifiers.drumNotes,
    };

    protected _startPreset(): void {
        this.addSub(drumTriggerOn$.pipe(
            filter((drumNote) => this.modifier === drumNote)
        )
            .subscribe((kick) => {
                nextActionFromMsg(Actions.mainDrum(DrumSounds.snare));
            }));
    }

    protected _stopPreset(): void {
    }
}
