import {PresetLogic} from '../../presets-logic';
import {Actions, Actions$, nextActionFromMsg,} from '../../../../../Shared/actions';

export class MultiColorToVidtMultiColor extends PresetLogic {
    protected _startPreset(): void {
        this.addSub(Actions$.multiColor.subscribe((color) => {
            nextActionFromMsg(Actions.vidtMultiColor(color));
        }));
    }

    protected _stopPreset(): void {
    }

}
