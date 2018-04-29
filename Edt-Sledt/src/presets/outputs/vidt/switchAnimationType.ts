import {Subscription} from 'rxjs/Subscription';
import {PresetLogic} from '../../presets-logic';
import {IModifierOptions} from '../../../../../Shared/types';
import {Note} from '../../../../../Shared/midi';
import {animationTypes} from '../../../../../Shared/vidt-presets';
import {toVidt} from '../../../outputs/edt-vidt';
import {Actions} from '../../../../../Shared/actions';

export class SwitchAnimationType extends PresetLogic {
    title = 'AnimationTypeForVidt';
    note = Note.F7;

    modifierOptions: IModifierOptions = {
        type: 'select',
        select: [
            {label: animationTypes[animationTypes.rotate], value: animationTypes.rotate},
            {label: animationTypes[animationTypes.spin], value: animationTypes.spin},
            {label: animationTypes[animationTypes.stretch], value: animationTypes.stretch},
            {label: animationTypes[animationTypes.bounce], value: animationTypes.bounce},
        ],
    };

    private subscriber: Subscription;

    public _startPreset(): void {
        toVidt(Actions.animationType(animationTypes[animationTypes[this.modifier]]));
    }

    public _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
        }
    }

}
