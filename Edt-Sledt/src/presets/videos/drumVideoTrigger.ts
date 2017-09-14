import {edtPreset} from '../../types';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import {preparePresetMsg, VidtPresets} from '../../../../SharedTypes/socket';
import {sendToVidt} from '../../communication/socket';
import 'rxjs/add/operator/withLatestFrom';

export class drumVideoTrigger implements edtPreset {
    private _triggerSubscriber: Subscription;

    constructor() {
    }

    startPreset(velocity: number): void {
        sendToVidt(<preparePresetMsg>{
            preset: VidtPresets.HackingAnimation
        });

    }

    stopPreset(): void {
        if (typeof this._triggerSubscriber !== 'undefined') this._triggerSubscriber.unsubscribe();
    }

}
