import {Subscription} from 'rxjs/Subscription';
import {PresetLogic} from '../../presets-logic';
import {IModifierOptions} from '../../../../../Shared/types';
import {Note} from '../../../../../Shared/midi';
import {Actions$} from '../../../../../Shared/actions';
import {FastLedtRainbowSpark} from "../../../outputs/edt-fastled";
import {withLatestFrom} from "rxjs/operators";

export class BeatToRainbowSpark extends PresetLogic {
    title = 'BeatToRainbowSpark';
    note = Note.B4;

    modifierOptions: IModifierOptions = {
        select: [
            { label: 'small', value: 30 },
            { label: 'medium', value: 60 },
            { label: 'large', value: 90 }
        ],
    };

    private subscriber: Subscription;

    public _startPreset(): void {
        this.subscriber = Actions$.mainBeat.pipe(
            withLatestFrom(Actions$.singleColor),
        ).subscribe(([, color]) => {
            FastLedtRainbowSpark(0, 0, 127, color, this.modifier);
        });
    }

    public _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
        }
    }

}
