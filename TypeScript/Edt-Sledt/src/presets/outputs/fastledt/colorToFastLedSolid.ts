import {PresetLogic} from '../../presets-logic';
import {Actions$} from '../../../../../Shared/actions';
import {FastLedtSingleSolid} from '../../../outputs/edt-fastled';
import {skip} from "rxjs/operators";
import {ModifierGroup} from "../../../../../Shared/types";

export class ColorToFastLedSolid extends PresetLogic {
    modifierOptions = {
        group: ModifierGroup.FastLED,
    };

    protected _startPreset(): void {
        this.addSub(Actions$.singleColor.pipe(
            skip(1),
        ).subscribe((color) => {
            FastLedtSingleSolid(0, color);
        }));
    }

    protected _stopPreset(): void {
    }

}
