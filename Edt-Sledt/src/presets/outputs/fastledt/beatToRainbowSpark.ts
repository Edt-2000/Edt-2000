import {Subscription} from 'rxjs/Subscription';
import {PresetLogic} from '../../presets-logic';
import {Actions$} from '../../../../../Shared/actions';
import {FastLedtRainbowSpark} from "../../../outputs/edt-fastled";
import {withLatestFrom} from "rxjs/operators";

export class BeatToRainbowSpark extends PresetLogic {
    modifierOptions = {
        select: [
            {label: 'small', value: 30},
            {label: 'medium', value: 60},
            {label: 'large', value: 90}
        ],
    };

    private subscriber: Subscription;

    protected _startPreset(): void {
        this.subscriber = Actions$.mainBeat.pipe(
            withLatestFrom(Actions$.singleColor),
        ).subscribe(([, color]) => {
            FastLedtRainbowSpark(0, 0, 127, color, this.modifier);
        });
    }

    protected _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
        }
    }

}
