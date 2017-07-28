import {edtPreset} from '../../types';
import {Subscription} from 'rxjs/Subscription';
import {filteredNoteOn} from '../../modules/midi';
import 'rxjs/add/operator/filter';

/**
 * The bg color cycle Preset cycles between colors trigger by NoteOn inputs, which can be changed by sending a Note on channel 15
 * The velocity of the Preset is the channel that is being listened to (1-14)
 */
export class drumVideoTrigger implements edtPreset {
    private _triggerSubscriber: Subscription;

    constructor() {
    }

    startPreset(velocity: number): void {
        this._triggerSubscriber = filteredNoteOn
            .filter(msg => msg.channel === 15)
            .subscribe((msg) => {

            });
    }

    stopPreset(): void {
        if (typeof this._triggerSubscriber !== 'undefined') this._triggerSubscriber.unsubscribe();
    }

}