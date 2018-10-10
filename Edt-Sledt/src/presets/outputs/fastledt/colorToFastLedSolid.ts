import {PresetLogic} from '../../presets-logic';
import {Actions$} from '../../../../../Shared/actions';
import {FastLedtSingleSolid} from '../../../outputs/edt-fastled';
import {skip} from "rxjs/operators";

export class ColorToFastLedSolid extends PresetLogic {
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
