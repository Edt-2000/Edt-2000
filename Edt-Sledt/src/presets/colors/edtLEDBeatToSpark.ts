import {EdtLEDSpark} from '../../outputs/edt-led';
import {BeatMain} from '../../subjects/triggers';
import {IEdtPreset} from '../presets';

export class EdtLEDBeatToSpark implements IEdtPreset {
    private beatSubscription;

    public startPreset(velocity: number): void {
        this.beatSubscription = BeatMain
            .subscribe(() => {
                EdtLEDSpark(0, 0, 127, 63, {
                    hue: 100,
                    saturation: 255,
                    brightness: 255,
                });
            });
    }

    public stopPreset(): void {
        if (typeof this.beatSubscription !== 'undefined') {
            this.beatSubscription.unsubscribe();
        }
    }
}
