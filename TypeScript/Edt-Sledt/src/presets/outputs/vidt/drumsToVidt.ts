import {PresetLogic} from '../../presets-logic';
import {Actions, nextActionFromMsg,} from '../../../../../Shared/actions';
import {drumTriggerOn$} from "../../../inputs/music-triggers";
import {DrumNotes} from "../../../../../Shared/config";
import {ModifierGroup} from "../../../../../Shared/types";

export class DrumsToVidt extends PresetLogic {
    modifierOptions = {
        group: ModifierGroup.Vidt,
    };

    protected _startPreset(): void {
        this.addSub(drumTriggerOn$.subscribe((note: DrumNotes) => {
            nextActionFromMsg(Actions.vidtDrum(note));
        }));
    }

    protected _stopPreset(): void {
    }

}
