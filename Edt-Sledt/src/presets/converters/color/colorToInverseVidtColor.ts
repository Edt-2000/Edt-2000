import {IColor} from '../../../../../Shared/types';
import {rescale} from '../../../../../Shared/utils';
import {PresetLogic} from '../../presets-logic';
import {Actions, Actions$} from '../../../../../Shared/actions';
import {toVidt} from "../../../outputs/edt-vidt";

export class ColorToInverseVidtColor extends PresetLogic {
    protected _startPreset(): void {
        this.addSub(Actions$.singleColor.pipe()
            .subscribe((color: IColor) => {
                const newColor: IColor = {
                    h: (color.h + rescale(63, 127, 0, 255)) % 255,
                    s: color.s,
                    b: color.b,
                };
                toVidt(Actions.vidtSingleColor(newColor));
            }));
    }

    protected _stopPreset(): void {
    }

}
