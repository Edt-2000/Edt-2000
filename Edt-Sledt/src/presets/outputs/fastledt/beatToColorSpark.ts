import {Subscription} from 'rxjs/Subscription';
import {PresetLogic} from '../../presets-logic';
import {Actions$} from '../../../../../Shared/actions';
import {FastLedtSpark} from '../../../outputs/edt-fastled';
import {withLatestFrom} from "rxjs/operators";

export class BeatToColorSpark extends PresetLogic {
    private subscriber: Subscription;

    protected _startPreset(): void {
        this.subscriber = Actions$.mainBeat.pipe(
            withLatestFrom(Actions$.singleColor),
        ).subscribe(([, color]) => {
            FastLedtSpark(0, color);
        });
    }

    protected _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
        }
    }

}
