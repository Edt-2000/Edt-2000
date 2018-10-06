import {Subscription} from 'rxjs/Subscription';
import {PresetLogic} from '../../presets-logic';
import {Actions$} from '../../../../../Shared/actions';
import {RGBLedtStrobe} from "../../../outputs/edt-rgbledt";
import {strobeSpeeds} from "../../../../../Shared/config";

export class ColorStrobeRGBLed extends PresetLogic {
    modifierOptions = {
        select: strobeSpeeds,
    };

    private subscriber: Subscription;

    protected _startPreset(): void {
        this.subscriber = Actions$.singleColor.subscribe((color) => {
            RGBLedtStrobe(0, this.modifier, color.h);
        });
    }

    protected _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
            // turn of strobe
            RGBLedtStrobe(0, 0, 0);
        }
    }

}
