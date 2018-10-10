import {PresetLogic} from '../../presets-logic';
import {Actions, Actions$,} from '../../../../../Shared/actions';
import {toVidt} from '../../../outputs/edt-vidt';

export class ColorToVidtColor extends PresetLogic {
    protected _startPreset(): void {
        this.addSub(Actions$.singleColor.subscribe((color) => {
            toVidt(Actions.vidtSingleColor(color));
        }));
    }

    protected _stopPreset(): void {
    }

}
