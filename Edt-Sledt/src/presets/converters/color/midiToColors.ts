import {Subscription} from 'rxjs/Subscription';
import {IColor} from '../../../../../Shared/socket';
import {noteOn$} from '../../../inputs/midi';
import {EdtMainColor} from '../../../subjects/colors';
import {rescale, shuffleArray} from '../../../../../Shared/utils';
import {PresetLogic} from '../../presets-logic';
import {filter} from 'rxjs/operators';

export class MidiToColors extends PresetLogic {
    title: string = 'Midi To Colors';

    private hue: number;
    private subscription: Subscription;

    private hues: number[];

    constructor() {
        super();
        this.hue = 0;

        this.hues = shuffleArray([
            0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330,
        ]);
    }

    public _startPreset(): void {

        this.subscription = noteOn$.pipe(
            filter((note) => note.channel === this.modifier),
        )
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

    public _stopPreset(): void {
        if (typeof this.subscription !== 'undefined') this.subscription.unsubscribe();
    }

}
