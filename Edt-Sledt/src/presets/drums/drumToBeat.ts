import {edtPreset} from '../presets';
import {Subscription} from 'rxjs/Subscription';
import {DrumTriggerOn$} from '../../inputs/musicTriggers';
import 'rxjs/add/operator/filter';
import {BeatMain} from '../../subjects/triggers';

export class DrumToBeat implements edtPreset {
    private _triggerSubscriber: Subscription;

    constructor() {
    }

    startPreset(listenTo: number): void {
        this._triggerSubscriber = DrumTriggerOn$
            .filter((drumNote) => listenTo === drumNote)
            .subscribe((note) => {
                BeatMain.next(note);
            });
    }

    stopPreset(): void {
        if (typeof this._triggerSubscriber !== 'undefined') this._triggerSubscriber.unsubscribe();
    }

}
