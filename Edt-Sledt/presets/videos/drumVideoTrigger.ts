import {edtPreset} from '../../types';
import {Subscription} from 'rxjs/Subscription';
import {filteredNoteOn} from '../../modules/midi';
import 'rxjs/add/operator/filter';

export class drumVideoTrigger implements edtPreset {
    private _triggerSubscriber: Subscription;

    constructor() {
    }

    startPreset(velocity: number): void {
        this._triggerSubscriber = filteredNoteOn.subscribe((msg) => {

        });
    }

    stopPreset(): void {
        if (typeof this._triggerSubscriber !== 'undefined') this._triggerSubscriber.unsubscribe();
    }

}