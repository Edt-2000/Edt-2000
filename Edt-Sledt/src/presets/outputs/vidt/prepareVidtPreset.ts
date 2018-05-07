import {Subscription} from 'rxjs/Subscription';
import {PresetLogic} from '../../presets-logic';
import {IModifierOptions} from '../../../../../Shared/types';
import {Note} from '../../../../../Shared/midi';
import {toVidt} from '../../../outputs/edt-vidt';
import {Actions} from '../../../../../Shared/actions';
import {vidtPresets} from '../../../../../Shared/vidt-presets';

export class PrepareVidtPreset extends PresetLogic {
    title = 'Switch Vidt Preset';
    note = Note.G8;

    modifierOptions: IModifierOptions = {
        select: Array.from(vidtPresets).map(([value, label]) => ({ value, label })),
    };

    private subscriber: Subscription;

    public _startPreset(): void {
        toVidt(Actions.prepareVidt(this.modifier));
    }

    public _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
        }
    }

}
