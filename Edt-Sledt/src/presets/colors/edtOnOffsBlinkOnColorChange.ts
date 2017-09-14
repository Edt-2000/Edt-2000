'use strict';
import {edtPreset} from '../../types';
import {EdtColor} from '../../outputs/shared-subjects';
import {Subscription} from 'rxjs/Subscription';
import {EdtOnOff} from '../../outputs/edt-led';

export class edtOnOffsBlinkOnColorChange implements edtPreset {
    private _edtOnOffSubscription: Subscription;

    constructor() {}

    startPreset(velocity: number): void {
        this._edtOnOffSubscription = EdtColor.subscribe((msg) => {
            EdtOnOff(1, 10);
        });
    }

    stopPreset(): void {
        if (typeof this._edtOnOffSubscription !== 'undefined') this._edtOnOffSubscription.unsubscribe();
    }

}
