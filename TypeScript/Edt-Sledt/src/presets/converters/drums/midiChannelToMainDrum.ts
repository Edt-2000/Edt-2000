import { PresetLogic } from '../../presets-logic';
import { musicNoteOn$ } from '../../../communication/midi';
import { modifiers } from '../../../../config/modifiers';
import { filter } from 'rxjs/operators';
import { Actions, nextActionFromMsg } from '../../../../../Shared/actions/actions';
import { ModifierGroup } from '../../../../../Shared/actions/types';

export class MidiChannelToMainDrum extends PresetLogic {
    modifierOptions = {
        select: modifiers.midiChannels,
        group: [
            ModifierGroup.Drums,
            ModifierGroup.Midi,
        ],
    };

    protected _startPreset(): void {
        this.addSub(
            musicNoteOn$
                .pipe(filter(note => note.channel === this.modifier))
                .subscribe(note => {
                    nextActionFromMsg(Actions.mainDrum(note));
                }),
        );
    }

    protected _stopPreset(): void {
    }
}
