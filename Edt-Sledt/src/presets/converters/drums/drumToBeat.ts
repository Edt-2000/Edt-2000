import {drumTriggerOn$} from '../../../inputs/music-triggers';
import {PresetLogic} from '../../presets-logic';
import {filter} from 'rxjs/operators';
import {Actions, nextActionFromMsg} from '../../../../../Shared/actions';
import {modifiers} from "../../../../../Shared/modifiers";

export class DrumToBeat extends PresetLogic {
    modifierOptions = {
        select: modifiers.drumNotes,
    };

    protected _startPreset(): void {
        this.addSub(drumTriggerOn$.pipe(
            filter((drumNote) => this.modifier === drumNote)
        )
            .subscribe((beat) => {
                nextActionFromMsg(Actions.mainBeat(beat));
            }));
    }

    protected _stopPreset(): void {
    }
}
