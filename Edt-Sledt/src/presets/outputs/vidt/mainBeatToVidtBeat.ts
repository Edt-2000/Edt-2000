import {PresetLogic} from '../../presets-logic';
import {Actions, Actions$,} from '../../../../../Shared/actions';
import {toVidt} from '../../../outputs/edt-vidt';

export class MainBeatToVidtBeat extends PresetLogic {
    protected _startPreset(): void {
        this.addSub(Actions$.mainBeat.subscribe((velocity) => {
            toVidt(Actions.vidtBeat(velocity));
        }));
    }

    protected _stopPreset(): void {
    }

}
