import {PresetLogic} from '../../presets-logic';
import {Actions, Actions$,} from '../../../../../Shared/actions';
import {toVidt} from '../../../outputs/edt-vidt';

export class MultiColorToVidtMultiColor extends PresetLogic {
    protected _startPreset(): void {
        this.addSub(Actions$.multiColor.subscribe((color) => {
            toVidt(Actions.vidtMultiColor(color));
        }));
    }

    protected _stopPreset(): void {
    }

}
