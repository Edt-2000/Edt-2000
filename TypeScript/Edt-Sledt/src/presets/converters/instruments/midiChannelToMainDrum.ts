import { PresetLogic } from "../../presets-logic";
import { musicNoteOn$ } from "../../../communication/midi";
import { modifiers } from "../../../../config/modifiers";
import {
    Actions,
    nextActionFromMsg,
} from "../../../../../Shared/actions/actions";
import { ModifierGroup } from "../../../../../Shared/actions/types";
import { filter } from "rxjs";

export class MidiChannelToMainDrum extends PresetLogic {
    modifierOptions = {
        select: modifiers.midiChannels,
        group: [ModifierGroup.Drums, ModifierGroup.Midi],
    };

    get mermaidConfig() {
        return [
            {
                subgraph: "MIDI-CONVERSION",
                entry: `MIDI-IN ${this.state ? `===>|${this.modifier}|` : "--->|.|"} Drums([Drums])`,
            },
        ];
    }

    protected _startPreset(): void {
        this.addSub(
            musicNoteOn$
                .pipe(filter((note) => note.channel === this.modifier))
                .subscribe((note) => {
                    nextActionFromMsg(Actions.mainDrum(note));
                }),
        );
    }

    protected _stopPreset(): void {}
}
