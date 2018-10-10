import {PresetLogic} from '../../presets-logic';
import {Actions$} from '../../../../../Shared/actions';
import {FastLedtSpark} from '../../../outputs/edt-fastled';
import {modifiers} from "../../../../../Shared/modifiers";
import {skip} from "rxjs/operators";

export class ColorToFastLedSpark extends PresetLogic {
    modifierOptions = {
        select: modifiers.fadeSpeeds,
    };

    protected _startPreset(): void {
        this.addSub(Actions$.singleColor.pipe(
            skip(1),
        ).subscribe((color) => {
            FastLedtSpark(0, color, this.modifier);
        }));
    }

    protected _stopPreset(): void {
    }

}
