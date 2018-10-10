import {Subscription} from 'rxjs/Subscription';
import {PresetLogic} from '../../presets-logic';
import {Actions$} from '../../../../../Shared/actions';
import {FastLedtRainbowSpark} from "../../../outputs/edt-fastled";
import {modifiers} from "../../../../../Shared/modifiers";
import {withLatestFrom} from "rxjs/operators";

export class BeatToRainbowSpark extends PresetLogic {
    modifierOptions = {
        select: modifiers.fadeSpeeds,
    };

    private subscriber: Subscription;

    protected _startPreset(): void {
        this.subscriber = Actions$.mainBeat.pipe(
            withLatestFrom(Actions$.singleColor),
        ).subscribe(([, color]) => {
            FastLedtRainbowSpark(0, this.modifier, color.h, 127);
        });
    }

    protected _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
        }
    }

}
