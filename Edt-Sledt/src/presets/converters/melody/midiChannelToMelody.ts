import {PresetLogic} from "../../presets-logic";
import {noteOn$} from "../../../inputs/midi";
import {modifiers} from "../../../../../Shared/modifiers";
import {filter} from "rxjs/operators";
import {Actions, nextActionFromMsg} from "../../../../../Shared/actions";

export class MidiChannelToMelody extends PresetLogic {
    modifierOptions = {
        select: modifiers.midiChannels,
    };

    protected _startPreset(): void {
        this.addSub(noteOn$.pipe(
            filter(note => note.channel === this.modifier),
        ).subscribe((note) => {
            nextActionFromMsg(Actions.melody(note));
        }));
    }

    protected _stopPreset(): void {
    }

}
