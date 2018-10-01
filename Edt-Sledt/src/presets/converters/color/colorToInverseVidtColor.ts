import {Subscription} from 'rxjs/Subscription';
import {IColor} from '../../../../../Shared/socket';
import {rescale} from '../../../../../Shared/utils';
import {PresetLogic} from '../../presets-logic';
import {IModifierOptions} from '../../../../../Shared/types';
import {Note} from '../../../../../Shared/midi';
import {Actions, Actions$, nextActionFromMsg} from '../../../../../Shared/actions';
import {toVidt} from "../../../outputs/edt-vidt";

export class ColorToInverseVidtColor extends PresetLogic {
    title: string = 'ColorToInverseVidtColor';
    note = Note.F$5;

    modifierOptions: IModifierOptions = {};

    private subscription: Subscription;

    constructor() {
        super();
    }

    public _startPreset(): void {
        this.subscription = Actions$.singleColor.pipe()
            .subscribe((color: IColor) => {
                const newColor: IColor = {
                    h: (color.h + rescale(63, 127, 0, 255)) % 255,
                    s: color.s,
                    b: color.b,
                };
                toVidt(Actions.vidtSingleColor(newColor));
            });
    }

    public _stopPreset(): void {
        if (typeof this.subscription !== 'undefined') this.subscription.unsubscribe();
    }

}
