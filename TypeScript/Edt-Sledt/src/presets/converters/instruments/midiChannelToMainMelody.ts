import { PresetLogic } from '../../presets-logic';
import { musicNoteOn$ } from '../../../communication/midi';
import { modifiers } from '../../../../config/modifiers';
import { filter } from 'rxjs/operators';
import { Actions, nextActionFromMsg } from '../../../../../Shared/actions/actions';
import { ModifierGroup } from '../../../../../Shared/actions/types';

export class MidiChannelToMainMelody extends PresetLogic {
    modifierOptions = {
        select: modifiers.midiChannels,
        group: [
            ModifierGroup.Melody,
            ModifierGroup.Midi,
        ],
    };

    get mermaidConfig() {
        return [{
            subgraph: 'MIDI-CONVERSION',
            entry: `MIDI-IN ${this.state ? `===>|${this.modifier}|` : '--->'} Melody([Melody])`,
        }];
    }

    protected _startPreset(): void {
        this.addSub(
            musicNoteOn$
                .pipe(filter(note => note.channel === this.modifier))
                .subscribe(note => {
                    nextActionFromMsg(Actions.mainMelody(note));
                }),
        );
    }

    protected _stopPreset(): void {
    }
}
