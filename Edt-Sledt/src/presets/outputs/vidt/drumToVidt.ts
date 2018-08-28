import {Subscription} from 'rxjs/Subscription';
import {PresetLogic} from '../../presets-logic';
import {IModifierOptions} from '../../../../../Shared/types';
import {Note} from '../../../../../Shared/midi';
import {
    Actions,
    Actions$,
} from '../../../../../Shared/actions';
import {toVidt} from '../../../outputs/edt-vidt';
import {drumTriggerOn$} from "../../../inputs/music-triggers";
import {DrumNotes} from "../../../../../Shared/config";

export class DrumToVidt extends PresetLogic {
    title = 'DrumToVidt';
    note = Note.C$0;

    modifierOptions: IModifierOptions = {};

    private subscriber: Subscription;

    public _startPreset(): void {
        this.subscriber = drumTriggerOn$.subscribe((note: DrumNotes) => {
            toVidt(Actions.vidtDrum(note));
        });
    }

    public _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
        }
    }

}
