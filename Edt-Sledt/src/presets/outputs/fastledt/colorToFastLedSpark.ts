import {Subscription} from 'rxjs/Subscription';
import {PresetLogic} from '../../presets-logic';
import {Actions$} from '../../../../../Shared/actions';
import {FastLedtSpark} from '../../../outputs/edt-fastled';
import {modifiers} from "../../../../../Shared/config";
import {skip} from "rxjs/operators";

export class ColorToFastLedSpark extends PresetLogic {
    modifierOptions = {
        select: modifiers.fadeSpeeds,
    };
    private subscriber: Subscription;

    protected _startPreset(): void {
        this.subscriber = Actions$.singleColor.pipe(
            skip(1),
        ).subscribe((color) => {
            FastLedtSpark(0, color, this.modifier);
        });
    }

    protected _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
        }
    }

}
