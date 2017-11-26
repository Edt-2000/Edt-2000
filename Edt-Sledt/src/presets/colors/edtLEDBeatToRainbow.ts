'use strict';
import {Subscription} from 'rxjs/Subscription';
import {EdtLEDRainbow} from '../../outputs/edt-led';
import {EdtMainColor} from '../../subjects/colors';
import {IEdtPreset} from '../presets';

export class EdtLEDBeatToRainbow implements IEdtPreset {
    private vidtColorSubscription: Subscription;

    public startPreset(velocity: number): void {
        this.vidtColorSubscription = EdtMainColor.subscribe((colorMsg) => {
            EdtLEDRainbow(0, 0, 127, colorMsg, velocity);
        });
    }

    public stopPreset(): void {
        if (typeof this.vidtColorSubscription !== 'undefined') {
            this.vidtColorSubscription.unsubscribe();
        }
    }

}
