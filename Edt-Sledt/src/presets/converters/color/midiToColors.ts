import 'rxjs/add/operator/filter';
import {Subscription} from 'rxjs/Subscription';
import {IColor} from '../../../../../SharedTypes/socket';
import {noteOn$} from '../../../inputs/midi';
import {EdtMainColor} from '../../../subjects/colors';
import {rescale, shuffleArray} from '../../../utils';
import {IEdtPresetLogic} from '../../presets';

/**
 * The bg IColor cycle Preset cycles between colors trigger by filteredNoteOn inputs
 */
export class MidiToColors implements IEdtPresetLogic {
    private hue: number;
    private subscription: Subscription;

    private hues: number[];

    constructor() {
        this.hue = 0;

        this.hues = shuffleArray([
            0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330,
        ]);
    }

    public startPreset(listenToChannel: number): void {

        this.subscription = noteOn$
            .filter((note) => note.channel === listenToChannel)
            .subscribe((note) => {
                this.hue = (rescale(this.hues[note.noteNumber - 1], 360, 0, 255)) % 255;
                const newColor: IColor = {
                    hue: this.hue,
                    saturation: 255,
                    brightness: 255,
                };
                // Emit this new IColor value to other listeners
                EdtMainColor.next(newColor);
            });
    }

    public stopPreset(): void {
        if (typeof this.subscription !== 'undefined') this.subscription.unsubscribe();
    }

}
