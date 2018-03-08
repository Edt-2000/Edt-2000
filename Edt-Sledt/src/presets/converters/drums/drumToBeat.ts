import 'rxjs/add/operator/filter';
import {Subscription} from 'rxjs/Subscription';
import {drumTriggerOn$} from '../../../inputs/musicTriggers';
import {BeatMain} from '../../../subjects/triggers';
import {IEdtPresetLogic} from '../../presets';

export class DrumToBeat implements IEdtPresetLogic {
    private subscriber: Subscription;

    public startPreset(listenTo: number): void {
        this.subscriber = drumTriggerOn$
            .filter((drumNote) => listenTo === drumNote)
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
