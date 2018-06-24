import {Subscription} from 'rxjs/Subscription';
import {PresetLogic} from '../../presets-logic';
import {IModifierOptions} from '../../../../../Shared/types';
import {Note} from '../../../../../Shared/midi';
import {MidiChannels} from '../../../../../Shared/config';

export class ColorToKittSimple extends PresetLogic {
    title = 'ColorToKittSimple';
    note = Note.A$1;

    modifierOptions: IModifierOptions = {
        select: [
            {label: MidiChannels[MidiChannels.channel_1], value: MidiChannels.channel_1},
            {label: MidiChannels[MidiChannels.channel_2], value: MidiChannels.channel_2},
            {label: MidiChannels[MidiChannels.channel_3], value: MidiChannels.channel_3},
            {label: MidiChannels[MidiChannels.channel_10], value: MidiChannels.channel_10},
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
