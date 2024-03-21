import { PresetLogic } from '../../presets-logic';
import { musicNoteOn$ } from '../../../communication/midi';
import { modifiers } from '../../../../config/modifiers';
import { filter } from 'rxjs/operators';
import { Actions, nextActionFromMsg } from '../../../../../Shared/actions/actions';
import { ModifierGroup } from '../../../../../Shared/actions/types';

export class MidiChannelToMainBass extends PresetLogic {
    modifierOptions = {
        select: modifiers.midiChannels,
        group: [
            ModifierGroup.Bass,
            ModifierGroup.Midi,
        ],
    };

    get mermaidConfig() {
        return [{
            subgraph: 'MIDI-CONVERSION',
            entry: `MIDI-IN ${this.state ? `===>|${this.modifier}|` : '--->'} Bass([Bass])`,
        }];
    }

    protected _startPreset(): void {
        this.addSub(
            musicNoteOn$
                .pipe(filter(note => note.channel === this.modifier))
                .subscribe(note => {
                    nextActionFromMsg(Actions.mainBass(note));
                }),
        );
    }

    protected _stopPreset(): void {
    }
}
