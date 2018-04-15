import {Subscription} from 'rxjs/Subscription';
import {IColor} from '../../../../../Shared/socket';
import {EdtMainColor} from '../../../subjects/colors';
import {BeatMain} from '../../../subjects/triggers';
import {rescale} from '../../../../../Shared/utils';
import {PresetLogic} from '../../presets-logic';
import {IModifierOptions} from '../../../../../Shared/types';

export class BeatToColor extends PresetLogic {
    title = 'Beat To Color';
    modifierOptions: IModifierOptions = {
        type: 'select',
        select: [
            {label: 'small', value: 30},
            {label: 'medium', value: 60},
            {label: 'large', value: 90},
        ],
    };


    private hue: number;
    private subscription: Subscription;

    constructor() {
        super();
        this.hue = 0;
    }

    public _startPreset(): void {
        this.subscription = BeatMain
            .subscribe(() => {
                this.hue = (this.hue + rescale(this.modifier, 127, 0, 255)) % 255;
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
