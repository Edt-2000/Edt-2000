import { PresetLogic } from '../../presets-logic';
import { modifiers } from '../../../../config/modifiers';
import { Actions, Actions$, nextActionFromMsg } from '../../../../../Shared/actions/actions';
import { ModifierGroup } from '../../../../../Shared/actions/types';
import { DrumSounds } from '../../../../config/config';
import { filter } from 'rxjs';

export class DrumSoundMap extends PresetLogic {
    modifierOptions = {
        select: modifiers.drumNotes,
        group: [
            ModifierGroup.Drums,
        ],
    };

    get mermaidConfig() {
        return this.state ? [{
            subgraph: 'MIDI-CONVERSION',
            entry: `Drums ===>|${this.modifier}| ${DrumSounds[this.sound]}`,
        }] : [];
    }

    constructor(public sound: DrumSounds) {
        super();
        this.title = 'DrumTo-' + DrumSounds[this.sound];
    }

    protected _startPreset(): void {
        this.addSub(
            Actions$.mainDrum
                .pipe(filter(drumNote => this.modifier === drumNote.note))
                .subscribe(() => {
                    nextActionFromMsg(Actions.mainDrumSound(this.sound));
                }),
        );
    }

    protected _stopPreset(): void {
    }
}
