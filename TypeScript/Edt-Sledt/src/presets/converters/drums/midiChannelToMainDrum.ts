import { PresetLogic } from "../../presets-logic";
import { noteOn$ } from "../../../inputs/midi";
import { modifiers } from "../../../../../Shared/modifiers";
import { filter } from "rxjs/operators";
import { Actions, nextActionFromMsg } from "../../../../../Shared/actions";
import { ModifierGroup } from "../../../../../Shared/types";

export class MidiChannelToMainDrum extends PresetLogic {
    modifierOptions = {
        select: modifiers.midiChannels,
        group: ModifierGroup.Drums,
    };

    protected _startPreset(): void {
        this.addSub(
            noteOn$
                .pipe(filter(note => note.channel === this.modifier))
                .subscribe(note => {
                    nextActionFromMsg(Actions.mainDrum(note));
                }),
        );
    }

    protected _stopPreset(): void {
    }
}
