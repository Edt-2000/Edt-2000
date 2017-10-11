import 'rxjs/add/operator/filter';
import {Subscription} from 'rxjs/Subscription';
import {drumTriggerOn$} from '../../inputs/musicTriggers';
import {BeatMain} from '../../subjects/triggers';
import {IEdtPreset} from '../presets';

export class DrumToBeat implements IEdtPreset {
    private triggerSubscriber: Subscription;

    public startPreset(listenTo: number): void {
        this.triggerSubscriber = drumTriggerOn$
            .filter((drumNote) => listenTo === drumNote)
            .subscribe((note) => {
                BeatMain.next(note);
            });
    }

    public stopPreset(): void {
        if (typeof this.triggerSubscriber !== 'undefined') {
            this.triggerSubscriber.unsubscribe();
        }
    }

}
