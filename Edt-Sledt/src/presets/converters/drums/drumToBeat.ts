import {Subscription} from 'rxjs/Subscription';
import {drumTriggerOn$} from '../../../inputs/music-triggers';
import {PresetLogic} from '../../presets-logic';
import {filter} from 'rxjs/operators';
import {Actions, nextActionFromMsg} from '../../../../../Shared/actions';
import {modifiers} from "../../../../../Shared/config";

export class DrumToBeat extends PresetLogic {
    modifierOptions = {
        select: modifiers.drumNotes,
    };

    private subscriber: Subscription;

    protected _startPreset(): void {
        this.subscriber = drumTriggerOn$.pipe(
            filter((drumNote) => this.modifier === drumNote)
        )
            .subscribe((beat) => {
                nextActionFromMsg(Actions.mainBeat(beat));
            });
    }

    protected _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
        }
    }

}
