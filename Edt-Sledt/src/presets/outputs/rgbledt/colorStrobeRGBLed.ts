import {Subscription} from 'rxjs/Subscription';
import {PresetLogic} from '../../presets-logic';
import {IModifierOptions} from '../../../../../Shared/types';
import {Note} from '../../../../../Shared/midi';
import {Actions$} from '../../../../../Shared/actions';
import {RGBLedtStrobe} from "../../../outputs/edt-rgbledt";
import {strobeSpeeds} from "../../../../../Shared/config";

export class ColorStrobeRGBLed extends PresetLogic {
    title = 'ColorStrobeRGBLed';
    note = Note.A4;

    modifierOptions: IModifierOptions = {
        select: strobeSpeeds,
    };

    private subscriber: Subscription;

    public _startPreset(): void {
        this.subscriber = Actions$.singleColor.subscribe((color) => {
            RGBLedtStrobe(0, this.modifier, color.h);
        });
    }

    public _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
            // turn of strobe
            RGBLedtStrobe(0, 0, 0);
        }
    }

}
