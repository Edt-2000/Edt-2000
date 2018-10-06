import {Subscription} from 'rxjs/Subscription';
import {PresetLogic} from '../../presets-logic';
import {Actions$} from '../../../../../Shared/actions';
import {FastLedtStrobe,} from '../../../outputs/edt-fastled';
import {strobeSpeeds} from "../../../../../Shared/config";

export class ColorStrobeFastLed extends PresetLogic {
    modifierOptions = {
        select: strobeSpeeds,
    };

    private subscriber: Subscription;

    protected _startPreset(): void {
        this.subscriber = Actions$.singleColor.subscribe((color) => {
            FastLedtStrobe(0, this.modifier, color.h);
        });
    }

    protected _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
            // turn of strobe
            FastLedtStrobe(0, 0, 0);
        }
    }

}
