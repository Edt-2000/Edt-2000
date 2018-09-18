import {Subscription} from 'rxjs/Subscription';
import {PresetLogic} from '../../presets-logic';
import {IModifierOptions} from '../../../../../Shared/types';
import {Note} from '../../../../../Shared/midi';
import {Actions$} from '../../../../../Shared/actions';
import {FastLedtStrobe,} from '../../../outputs/edt-fastled';
import {strobeSpeeds} from "../../../../../Shared/config";

export class ColorStrobeFastLed extends PresetLogic {
    title = 'ColorStrobeFastLed';
    note = Note.A$4;

    modifierOptions: IModifierOptions = {
        select: strobeSpeeds,
    };

    private subscriber: Subscription;

    public _startPreset(): void {
        this.subscriber = Actions$.singleColor.subscribe((color) => {
            FastLedtStrobe(0, this.modifier, color.h);
        });
    }

    public _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
            // turn of strobe
            FastLedtStrobe(0, 0, 0);
        }
    }

}
