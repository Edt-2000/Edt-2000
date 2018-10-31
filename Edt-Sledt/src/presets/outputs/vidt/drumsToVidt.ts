import {PresetLogic} from '../../presets-logic';
import {Actions, nextActionFromMsg,} from '../../../../../Shared/actions';
import {drumTriggerOn$} from "../../../inputs/music-triggers";
import {DrumNotes} from "../../../../../Shared/config";

export class DrumsToVidt extends PresetLogic {
    protected _startPreset(): void {
        this.addSub(drumTriggerOn$.subscribe((note: DrumNotes) => {
            nextActionFromMsg(Actions.vidtDrum(note));
        }));
    }

    protected _stopPreset(): void {
    }

}
