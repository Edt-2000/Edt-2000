import {Subscription} from 'rxjs/Subscription';
import {IColor} from '../../../../../Shared/socket';
import {EdtMainColor} from '../../../subjects/colors';
import {BeatMain} from '../../../subjects/triggers';
import {rescale} from '../../../../../Shared/utils';
import {PresetLogic} from '../../presets-logic';

export class BeatToColor extends PresetLogic {
    title = 'Beat To Color';
    private hue: number;

    private subscription: Subscription;

    private rotationVelocity: number;

    constructor() {
        super();
        this.hue = 0;
        this.rotationVelocity = 0;
    }

    public _startPreset(rotationVelocity: number): void {
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

    public _stopPreset(): void {
        if (typeof this.subscription !== 'undefined') this.subscription.unsubscribe();
    }

}
