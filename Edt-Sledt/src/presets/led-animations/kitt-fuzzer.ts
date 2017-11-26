import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/withLatestFrom';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {IColor} from '../../../../SharedTypes/socket';
import {noteOn$} from '../../inputs/midi';
import {EdtKitt, EdtLEDSpark} from '../../outputs/edt-led';
import {EdtMainColor} from '../../subjects/colors';
import {IMidiNoteMsg} from '../../types';
import {rescale} from '../../utils';
import {IEdtPreset} from '../presets';

/**
 * The bg IColor cycle Preset cycles between colors trigger by filteredNoteOn inputs
 */
export class KittFuzzer implements IEdtPreset {
    private subscription: Subscription;
    private position: number;

    constructor() {
        this.position = 0;
    }

    public startPreset(speed: number): void {
        this.subscription = Observable
            .interval(speed)
            .withLatestFrom(EdtMainColor, noteOn$.filter((note) => note.channel === 3))
            .subscribe(([count, color, note]) => {
                const length = Math.floor(127 / 12);
                this.position = rescale(note.noteNumber, 12, 0, 127 - length);
                EdtLEDSpark(
                    0,
                    this.position,
                    this.position + length,
                    1,
                    color);
            });
    }

    public stopPreset(): void {
        if (typeof this.subscription !== 'undefined') this.subscription.unsubscribe();
    }

}
