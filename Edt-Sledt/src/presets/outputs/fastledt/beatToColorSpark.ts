import {Subscription} from 'rxjs/Subscription';
import {PresetLogic} from '../../presets-logic';
import {IModifierOptions} from '../../../../../Shared/types';
import {Note} from '../../../../../Shared/midi';
import {Actions$} from '../../../../../Shared/actions';
import {FastLedtSpark} from '../../../outputs/edt-fastled';
import {withLatestFrom} from "rxjs/operators";

export class BeatToColorSpark extends PresetLogic {
    title = 'BeatToColorSpark';
    note = Note.B3;

    modifierOptions: IModifierOptions = {};

    private subscriber: Subscription;

    public _startPreset(): void {
        this.subscriber = Actions$.mainBeat.pipe(
            withLatestFrom(Actions$.singleColor),
        ).subscribe(([, color]) => {
            FastLedtSpark(0, color);
        });
    }

    public _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
        }
    }

}
