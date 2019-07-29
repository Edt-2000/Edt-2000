import { PresetLogic } from '../../presets-logic';
import { Actions, Actions$, nextActionFromMsg } from '../../../../../Shared/actions';
import { ModifierGroup } from '../../../../../Shared/helpers/types';

export class MainBeatToVidtBeat extends PresetLogic {
    modifierOptions = {
        group: [
            ModifierGroup.Vidt,
            ModifierGroup.Beat,
        ],
    };

    protected _startPreset(): void {
        this.addSub(
            Actions$.mainBeat.subscribe(velocity => {
                nextActionFromMsg(Actions.vidtBeat(velocity));
            }),
        );
    }

    protected _stopPreset(): void {
    }
}
