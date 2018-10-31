import {PresetLogic} from '../../presets-logic';
import {Actions, Actions$, nextActionFromMsg,} from '../../../../../Shared/actions';

export class MainBeatToVidtBeat extends PresetLogic {
    protected _startPreset(): void {
        this.addSub(Actions$.mainBeat.subscribe((velocity) => {
            nextActionFromMsg(Actions.vidtBeat(velocity));
        }));
    }

    protected _stopPreset(): void {
    }

}
