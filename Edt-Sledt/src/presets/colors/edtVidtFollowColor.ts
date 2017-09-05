'use strict';
import {edtPreset} from '../../types';
import {EdtColor} from '../../outputs/shared-subjects';
import {Subscription} from 'rxjs/Subscription';
import {sendToVidt} from '../../communication/socket';

export class EdtVidtFollowColor implements edtPreset {
    private _vidtColorSubscription: Subscription;

    constructor() {}

    startPreset(velocity: number): void {
        // Send the whole colorMsg to the EdtVidt where it will change color accordingly
        this._vidtColorSubscription = EdtColor.subscribe(sendToVidt);
    }

    stopPreset(): void {
        if (typeof this._vidtColorSubscription !== 'undefined') this._vidtColorSubscription.unsubscribe();
    }

}
