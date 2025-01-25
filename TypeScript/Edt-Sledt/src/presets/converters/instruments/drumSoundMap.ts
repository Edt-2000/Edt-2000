import { PresetLogic } from "../../presets-logic";
import { modifiers } from "../../../../config/modifiers";
import {
    Actions,
    Actions$,
    nextActionFromMsg,
} from "../../../../../Shared/actions/actions";
import { ModifierGroup } from "../../../../../Shared/actions/types";
import { filter } from "rxjs";

import { DrumSounds } from "../../../../../Shared/midi/types";

export class DrumSoundMap extends PresetLogic {
    modifierOptions = {
        select: modifiers.drumNotes,
        group: [ModifierGroup.Drums],
    };

    constructor(public sound: DrumSounds) {
        super();
        this.title = "DrumTo-" + DrumSounds[this.sound];
    }

    get mermaidConfig() {
        return [
            {
                subgraph: "MIDI-CONVERSION",
                entry: this.state
                    ? `Drums ===>|${this.modifier}| ${DrumSounds[this.sound].toUpperCase()}`
                    : `Drums --->|.| ${DrumSounds[this.sound].toUpperCase()}`,
            },
        ];
    }

    protected _startPreset(): void {
        this.addSub(
            Actions$.mainDrum
                .pipe(filter((drumNote) => this.modifier === drumNote.note))
                .subscribe(({ velocity }) => {
                    nextActionFromMsg(
                        Actions.mainDrumSound({
                            sound: DrumSounds[this.sound],
                            velocity,
                        }),
                    );
                }),
        );
    }

    protected _stopPreset(): void {}
}
