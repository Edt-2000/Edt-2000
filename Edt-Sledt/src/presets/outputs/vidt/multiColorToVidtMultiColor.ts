import {Subscription} from 'rxjs/Subscription';
import {PresetLogic} from '../../presets-logic';
import {Actions, Actions$,} from '../../../../../Shared/actions';
import {toVidt} from '../../../outputs/edt-vidt';

export class MultiColorToVidtMultiColor extends PresetLogic {
    private subscriber: Subscription;

    protected _startPreset(): void {
        this.subscriber = Actions$.multiColor.subscribe((color) => {
            toVidt(Actions.vidtMultiColor(color));
        });
    }

    protected _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
        }
    }

}
