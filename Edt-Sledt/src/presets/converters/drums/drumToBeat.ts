import {Subscription} from 'rxjs/Subscription';
import {DrumNotes, drumTriggerOn$} from '../../../inputs/music-triggers';
import {PresetLogic} from '../../presets-logic';
import {filter} from 'rxjs/operators';
import {IModifierOptions} from '../../../../../Shared/types';
import {Note} from '../../../../../Shared/midi';
import {Actions, nextActionFromMsg} from '../../../../../Shared/actions';

export class DrumToBeat extends PresetLogic {
    title = 'Drum to Beat';
    note = Note.C$_2;

    modifierOptions: IModifierOptions = {
        type: 'select',
        select: [
            {label: DrumNotes[DrumNotes._1], value: DrumNotes._1},
            {label: DrumNotes[DrumNotes._2], value: DrumNotes._2},
            {label: DrumNotes[DrumNotes._3], value: DrumNotes._3},
            {label: DrumNotes[DrumNotes._4], value: DrumNotes._4},
            {label: DrumNotes[DrumNotes._5], value: DrumNotes._5},
            {label: DrumNotes[DrumNotes._6A], value: DrumNotes._6A},
            {label: DrumNotes[DrumNotes._6B], value: DrumNotes._6B},
            {label: DrumNotes[DrumNotes._7A], value: DrumNotes._7A},
            {label: DrumNotes[DrumNotes._7B], value: DrumNotes._7B},
        ],
    };

    private subscriber: Subscription;

    public _startPreset(): void {
        this.subscriber = drumTriggerOn$.pipe(
            filter((drumNote) => this.modifier === drumNote)
        )
            .subscribe((beat) => {
                nextActionFromMsg(Actions.mainBeat(beat));
            });
    }

    public _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
        }
    }

}
