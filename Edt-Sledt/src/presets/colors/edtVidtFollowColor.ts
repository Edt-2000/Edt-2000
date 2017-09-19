'use strict';
import {EdtMainColor} from '../../subjects/colors';
import {Subscription} from 'rxjs/Subscription';
import {sendToVidt} from '../../outputs/edt-vidt';
import {edtPreset} from '../presets';

export class EdtVidtFollowColor implements edtPreset {
    private _vidtColorSubscription: Subscription;

    constructor() {}

    startPreset(velocity: number): void {
        // Send the whole colorMsg to the EdtVidt where it will change color accordingly
        this._vidtColorSubscription = EdtMainColor.subscribe(sendToVidt);
    }

    stopPreset(): void {
        if (typeof this._vidtColorSubscription !== 'undefined') this._vidtColorSubscription.unsubscribe();
    }

}
