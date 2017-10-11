import 'rxjs/add/operator/filter';
import {Subscription} from 'rxjs/Subscription';
import {IColor} from '../../../../SharedTypes/socket';
import {EdtMainColor} from '../../subjects/colors';
import {rescale} from '../../utils';
import {IEdtPreset} from '../presets';
import {BeatMain} from '../../subjects/triggers';

/**
 * The bg IColor cycle Preset cycles between colors trigger by filteredNoteOn inputs
 */
export class BgColorCycle implements IEdtPreset {
    private hue: number;

    private triggerSubscriber: Subscription;

    private rotationVelocity: number;

    constructor() {
        this.hue = 0;
        this.rotationVelocity = 0;
    }

    public startPreset(rotationVelocity: number): void {
        this.rotationVelocity = rotationVelocity;

        this.triggerSubscriber = BeatMain
            .subscribe(() => {
                this.hue = (this.hue + rescale(this.rotationVelocity, 127, 0, 360)) % 360;
                const newColor: IColor = {
                    hue: this.hue,
                    saturation: 100,
                    brightness: 50,
                };
                // Emit this new IColor value to other listeners
                EdtMainColor.next(newColor);
            });
    }

    public stopPreset(): void {
        if (typeof this.triggerSubscriber !== 'undefined') this.triggerSubscriber.unsubscribe();
    }

}
