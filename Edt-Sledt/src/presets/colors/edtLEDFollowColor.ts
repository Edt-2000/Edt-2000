'use strict';
import {EdtMainColor} from '../../subjects/colors';
import {Subscription} from 'rxjs/Subscription';
import {EdtLEDFlash} from '../../outputs/edt-led';
import {edtPreset} from '../presets';

export class EdtLEDFollowColor implements edtPreset {
    private _vidtColorSubscription: Subscription;

    constructor() {}

    startPreset(velocity: number): void {
        this._vidtColorSubscription = EdtMainColor.subscribe((colorMsg) => {
            EdtLEDFlash(0, 0, 127, 0, colorMsg);
        });
    }

    stopPreset(): void {
        if (typeof this._vidtColorSubscription !== 'undefined') this._vidtColorSubscription.unsubscribe();
    }

}
