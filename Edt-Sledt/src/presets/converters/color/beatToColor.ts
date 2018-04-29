import {Subscription} from 'rxjs/Subscription';
import {IColor} from '../../../../../Shared/socket';
import {mainColor} from '../../../subjects/colors';
import {BeatMain} from '../../../subjects/triggers';
import {rescale} from '../../../../../Shared/utils';
import {PresetLogic} from '../../presets-logic';
import {IModifierOptions} from '../../../../../Shared/types';
import {Note} from '../../../../../Shared/midi';

export class BeatToColor extends PresetLogic {
    title = 'Beat To Color';
    note = Note.C_2;
    modifierOptions: IModifierOptions = {
        type: 'none',
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
                // TODO: set to random set of colors instead of rotating hue
                this.hue = (this.hue + rescale(60, 127, 0, 255)) % 255;
                const newColor: IColor = {
                    hue: this.hue,
                    saturation: 255,
                    brightness: 255,
                };
                // Emit this new IColor value to other listeners
                mainColor.next(newColor);
            });
    }

    public _stopPreset(): void {
        if (typeof this.subscription !== 'undefined') this.subscription.unsubscribe();
    }

}
