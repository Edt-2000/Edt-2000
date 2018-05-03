import {Subscription} from 'rxjs/Subscription';
import {PresetLogic} from '../../presets-logic';
import {IModifierOptions} from '../../../../../Shared/types';
import {Note} from '../../../../../Shared/midi';
import {MidiChannels} from '../../../../../Shared/config';

export class ColorToKittSimple extends PresetLogic {
    title = 'ColorToKittSimple';
    note = Note.A$1;

    modifierOptions: IModifierOptions = {
        type: 'select',
        select: [
            {label: MidiChannels[MidiChannels.synth], value: MidiChannels.synth},
            {label: MidiChannels[MidiChannels.bass], value: MidiChannels.bass},
            {label: MidiChannels[MidiChannels.melody], value: MidiChannels.melody},
            {label: MidiChannels[MidiChannels.drum], value: MidiChannels.drum},
        ],
    };

    private subscriber: Subscription;

    public _startPreset(): void {


        // this.subscriber = mainColor$.pipe(
        //     withLatestFrom(noteOn$.pipe(filter(note => note.channel === this.modifier))),
        // ).subscribe(([color, note]) => {
        //     EdtKitt(color, rescale(note.noteNumber, 8, 1, 12));
        // });
    }

    public _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
        }
    }

}
