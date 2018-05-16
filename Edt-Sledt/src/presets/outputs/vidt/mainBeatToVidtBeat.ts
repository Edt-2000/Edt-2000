import {Subscription} from 'rxjs/Subscription';
import {PresetLogic} from '../../presets-logic';
import {IModifierOptions} from '../../../../../Shared/types';
import {Note} from '../../../../../Shared/midi';
import {
    Actions,
    Actions$,
} from '../../../../../Shared/actions';
import {toVidt} from '../../../outputs/edt-vidt';

export class MainBeatToVidtBeat extends PresetLogic {
    title = 'MainBeatToVidtBeat';
    note = Note.A$3;

    modifierOptions: IModifierOptions = {};

    private subscriber: Subscription;

    public _startPreset(): void {
        this.subscriber = Actions$.mainBeat.subscribe((velocity) => {
            toVidt(Actions.vidtBeat(velocity));
        });
    }

    public _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
        }
    }

}
