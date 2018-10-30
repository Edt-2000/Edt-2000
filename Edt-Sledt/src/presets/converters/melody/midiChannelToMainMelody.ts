import {PresetLogic} from "../../presets-logic";
import {noteOn$} from "../../../inputs/midi";
import {modifiers} from "../../../../../Shared/modifiers";
import {filter} from "rxjs/operators";
import {Actions, nextActionFromMsg} from "../../../../../Shared/actions";

export class MidiChannelToMainMelody extends PresetLogic {
    modifierOptions = {
        select: modifiers.midiChannels,
    };

    protected _startPreset(): void {
        this.addSub(noteOn$.pipe(
            filter(note => note.channel === this.modifier),
        ).subscribe((note) => {
            nextActionFromMsg(Actions.mainMelody(note));
        }));
    }

    protected _stopPreset(): void {
    }

}
