import {PresetLogic} from '../../presets-logic';
import {modifiers} from "../../../../../Shared/modifiers";
import {drumTriggerOn$} from "../../../inputs/music-triggers";
import {filter} from "rxjs/operators";
import {Actions, nextActionFromMsg} from "../../../../../Shared/actions";
import {DrumSounds} from "../../../../../Shared/drums";
import {ModifierGroup} from "../../../../../Shared/types";

export class DrumSoundMap extends PresetLogic {
    constructor(public sound: DrumSounds) {
        super();
        this.title = 'DrumTo-' + DrumSounds[this.sound];
    }

    modifierOptions = {
        select: modifiers.drumNotes,
        group: ModifierGroup.Drums,
    };

    protected _startPreset(): void {
        this.addSub(drumTriggerOn$.pipe(
            filter((drumNote) => this.modifier === drumNote)
        )
            .subscribe(() => {
                nextActionFromMsg(Actions.mainDrum(this.sound));
            }));
    }

    protected _stopPreset(): void {
    }
}
