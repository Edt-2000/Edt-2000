import { PresetLogic } from '../../presets-logic';
import { musicNoteOn$ } from '../../../communication/midi';
import { modifiers } from '../../../../../Shared/modifiers';
import { filter } from 'rxjs/operators';
import { Actions, nextActionFromMsg } from '../../../../../Shared/actions';
import { ModifierGroup } from '../../../../../Shared/helpers/types';

export class MidiChannelToMainBass extends PresetLogic {
    modifierOptions = {
        select: modifiers.midiChannels,
        group: [
            ModifierGroup.Bass,
            ModifierGroup.Midi,
        ],
    };

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
