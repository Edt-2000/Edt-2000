'use strict';
import {edtPreset} from '../../types';
import {EdtColor} from '../../outputs/shared-subjects';
import {Subscription} from 'rxjs/Subscription';
import {EdtLEDFlash} from '../../outputs/edt-led';

export class EdtLEDFollowColor implements edtPreset {
    private _vidtColorSubscription: Subscription;

    constructor() {}

    startPreset(velocity: number): void {
        this._vidtColorSubscription = EdtColor.subscribe((colorMsg) => {
            EdtLEDFlash(0, 0, 127, 0, colorMsg);
        });
    }

    stopPreset(): void {
        if (typeof this._vidtColorSubscription !== 'undefined') this._vidtColorSubscription.unsubscribe();
    }

}
