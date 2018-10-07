import {Subscription} from 'rxjs/Subscription';
import {PresetLogic} from '../../presets-logic';
import {Actions,} from '../../../../../Shared/actions';
import {toVidt} from '../../../outputs/edt-vidt';
import {drumTriggerOn$} from "../../../inputs/music-triggers";
import {DrumNotes} from "../../../../../Shared/config";

export class DrumToVidt extends PresetLogic {
    private subscriber: Subscription;

    protected _startPreset(): void {
        this.subscriber = drumTriggerOn$.subscribe((note: DrumNotes) => {
            toVidt(Actions.vidtDrum(note));
        });
    }

    protected _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
        }
    }

}
