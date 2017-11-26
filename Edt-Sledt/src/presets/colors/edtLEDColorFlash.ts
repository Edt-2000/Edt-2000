'use strict';
import {Subscription} from 'rxjs/Subscription';
import {EdtLEDSpark} from '../../outputs/edt-led';
import {EdtMainColor} from '../../subjects/colors';
import {IEdtPreset} from '../presets';

export class EdtLEDColorFlash implements IEdtPreset {
    private subscription: Subscription;

    public startPreset(velocity: number): void {
        this.subscription = EdtMainColor.subscribe((colorMsg) => {
            EdtLEDSpark(0, 0, 127, velocity, colorMsg);
        });
    }

    public stopPreset(): void {
        if (typeof this.subscription !== 'undefined') {
            this.subscription.unsubscribe();
        }
    }

}
