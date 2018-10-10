import {PresetLogic} from '../../presets-logic';
import {Actions,} from '../../../../../Shared/actions';
import {toVidt} from '../../../outputs/edt-vidt';
import {drumTriggerOn$} from "../../../inputs/music-triggers";
import {DrumNotes} from "../../../../../Shared/config";

export class DrumsToVidt extends PresetLogic {
    protected _startPreset(): void {
        this.addSub(drumTriggerOn$.subscribe((note: DrumNotes) => {
            toVidt(Actions.vidtDrum(note));
        }));
    }

    protected _stopPreset(): void {
    }

}
