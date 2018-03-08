import {Subscription} from 'rxjs/Subscription';
import {drumTriggerOn$} from '../../../inputs/musicTriggers';
import {BeatMain} from '../../../subjects/triggers';
import {IEdtPresetLogic} from '../../presets';
import {filter} from 'rxjs/operators';

export class DrumToBeat implements IEdtPresetLogic {
    private subscriber: Subscription;

    public startPreset(listenTo: number): void {
        this.subscriber = drumTriggerOn$.pipe(
                filter((drumNote) => listenTo === drumNote)
            )
            .subscribe((note) => {
                BeatMain.next(note);
            });
    }

    public stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
        }
    }

}
