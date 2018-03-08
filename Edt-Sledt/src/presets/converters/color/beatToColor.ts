import {Subscription} from 'rxjs/Subscription';
import {IColor} from '../../../../../SharedTypes/socket';
import {EdtMainColor} from '../../../subjects/colors';
import {BeatMain} from '../../../subjects/triggers';
import {rescale} from '../../../utils';
import {IEdtPresetLogic} from '../../presets';

/**
 * The bg IColor cycle Preset cycles between colors trigger by filteredNoteOn inputs
 */
export class BeatToColor implements IEdtPresetLogic {
    private hue: number;

    private subscription: Subscription;

    private rotationVelocity: number;

    constructor() {
        this.hue = 0;
        this.rotationVelocity = 0;
    }

    public startPreset(rotationVelocity: number): void {
        this.rotationVelocity = rotationVelocity;

        this.subscription = BeatMain
            .subscribe(() => {
                this.hue = (this.hue + rescale(this.rotationVelocity, 127, 0, 255)) % 255;
                const newColor: IColor = {
                    hue: this.hue,
                    saturation: 255,
                    brightness: 255,
                };
                // Emit this new IColor value to other listeners
                EdtMainColor.next(newColor);
            });
    }

    public stopPreset(): void {
        if (typeof this.subscription !== 'undefined') this.subscription.unsubscribe();
    }

}
