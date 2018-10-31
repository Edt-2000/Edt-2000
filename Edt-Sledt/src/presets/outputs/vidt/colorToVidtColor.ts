import {PresetLogic} from '../../presets-logic';
import {Actions, Actions$, nextActionFromMsg,} from '../../../../../Shared/actions';

export class ColorToVidtColor extends PresetLogic {
    protected _startPreset(): void {
        this.addSub(Actions$.singleColor.subscribe((color) => {
            nextActionFromMsg(Actions.vidtSingleColor(color));
        }));
    }

    protected _stopPreset(): void {
    }

}
