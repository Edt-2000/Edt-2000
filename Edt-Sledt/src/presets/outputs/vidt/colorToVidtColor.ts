import {Subscription} from 'rxjs/Subscription';
import {PresetLogic} from '../../presets-logic';
import {Actions, Actions$,} from '../../../../../Shared/actions';
import {toVidt} from '../../../outputs/edt-vidt';

export class ColorToVidtColor extends PresetLogic {
    private subscriber: Subscription;

    protected _startPreset(): void {
        this.subscriber = Actions$.singleColor.subscribe((color) => {
            toVidt(Actions.vidtSingleColor(color));
        });
    }

    protected _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
        }
    }

}
