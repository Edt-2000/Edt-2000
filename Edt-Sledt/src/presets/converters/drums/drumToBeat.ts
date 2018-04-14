import {Subscription} from 'rxjs/Subscription';
import {drumTriggerOn$} from '../../../inputs/music-triggers';
import {BeatMain} from '../../../subjects/triggers';
import {PresetLogic} from '../../presets-logic';
import {filter} from 'rxjs/operators';

export class DrumToBeat extends PresetLogic {
    title = "Drum to Beat";

    private subscriber: Subscription;

    public _startPreset(): void {
        this.subscriber = drumTriggerOn$.pipe(
            filter((drumNote) => this.modifier === drumNote)
        )
            .subscribe((note) => {
                BeatMain.next(note);
            });
    }

    public _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
        }
    }

}
