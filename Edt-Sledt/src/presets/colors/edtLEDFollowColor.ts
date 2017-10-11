'use strict';
import {Subscription} from 'rxjs/Subscription';
import {EdtLEDFlash} from '../../outputs/edt-led';
import {EdtMainColor} from '../../subjects/colors';
import {IEdtPreset} from '../presets';

export class EdtLEDFollowColor implements IEdtPreset {
    private vidtColorSubscription: Subscription;

    public startPreset(velocity: number): void {
        this.vidtColorSubscription = EdtMainColor.subscribe((colorMsg) => {
            EdtLEDFlash(0, 0, 127, 0, colorMsg);
        });
    }

    public stopPreset(): void {
        if (typeof this.vidtColorSubscription !== 'undefined') {
            this.vidtColorSubscription.unsubscribe();
        }
    }

}
