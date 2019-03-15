import {PresetLogic} from '../../presets-logic';
import {Actions, Actions$, nextActionFromMsg,} from '../../../../../Shared/actions';
import {ModifierGroup} from "../../../../../Shared/types";

export class ColorToVidtColor extends PresetLogic {
    modifierOptions = {
        group: ModifierGroup.Vidt,
    };

    protected _startPreset(): void {
        this.addSub(Actions$.singleColor.subscribe((color) => {
            nextActionFromMsg(Actions.vidtSingleColor(color));
        }));
    }

    protected _stopPreset(): void {
    }

}
