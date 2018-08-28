import {Subscription} from 'rxjs/Subscription';
import {PresetLogic} from '../../presets-logic';
import {IModifierOptions} from '../../../../../Shared/types';
import {Note} from '../../../../../Shared/midi';
import {
    Actions,
    Actions$,
} from '../../../../../Shared/actions';
import {toVidt} from '../../../outputs/edt-vidt';

export class MultiColorToVidtMultiColor extends PresetLogic {
    title = 'MultiColorToVidtMultiColor';
    note = Note.B5;

    modifierOptions: IModifierOptions = {};

    private subscriber: Subscription;

    public _startPreset(): void {
        this.subscriber = Actions$.multiColor.subscribe((color) => {
            toVidt(Actions.vidtMultiColor(color));
        });
    }

    public _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
        }
    } test

}
