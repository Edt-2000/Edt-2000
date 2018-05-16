import {Subscription} from 'rxjs/Subscription';
import {PresetLogic} from '../../presets-logic';
import {IModifierOptions} from '../../../../../Shared/types';
import {Note} from '../../../../../Shared/midi';
import {
    Actions,
    Actions$,
} from '../../../../../Shared/actions';
import {toVidt} from '../../../outputs/edt-vidt';

export class ColorToVidtColor extends PresetLogic {
    title = 'ColorToVidtColor';
    note = Note.A$5;

    modifierOptions: IModifierOptions = {};

    private subscriber: Subscription;

    public _startPreset(): void {
        this.subscriber = Actions$.singleColor.subscribe((color) => {
            toVidt(Actions.vidtSingleColor(color));
        });
    }

    public _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
        }
    }

}
