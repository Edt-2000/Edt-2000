'use strict';
import {edtPreset} from '../../types';
import {EdtVidtColor} from '../color';
import {Subscription} from 'rxjs/Subscription';
import {EdtLEDFlash} from '../../modules/edt-led-utils';

export class EdtLEDFollowVidt implements edtPreset {
    private _vidtColorSubscription: Subscription;

    constructor() {}

    startPreset(velocity: number): void {
        this._vidtColorSubscription = EdtVidtColor.subscribe((msg) => {
            console.log('LED follows vid: ', msg);
            EdtLEDFlash(undefined, 0, 127, 0, msg);
        });
    }

    stopPreset(): void {
        if (typeof this._vidtColorSubscription !== 'undefined') this._vidtColorSubscription.unsubscribe();
    }

}