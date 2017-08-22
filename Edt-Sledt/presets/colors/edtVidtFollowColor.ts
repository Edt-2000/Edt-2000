'use strict';
import {edtPreset} from '../../types';
import {EdtColor} from '../color';
import {Subscription} from 'rxjs/Subscription';
import {sendToVidt} from '../../modules/socket';

export class EdtVidtFollowColor implements edtPreset {
    private _vidtColorSubscription: Subscription;

    constructor() {}

    startPreset(velocity: number): void {
        this._vidtColorSubscription = EdtColor.subscribe(sendToVidt);
    }

    stopPreset(): void {
        if (typeof this._vidtColorSubscription !== 'undefined') this._vidtColorSubscription.unsubscribe();
    }

}