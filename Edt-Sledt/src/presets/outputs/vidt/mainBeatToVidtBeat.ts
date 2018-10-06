import {Subscription} from 'rxjs/Subscription';
import {PresetLogic} from '../../presets-logic';
import {Actions, Actions$,} from '../../../../../Shared/actions';
import {toVidt} from '../../../outputs/edt-vidt';

export class MainBeatToVidtBeat extends PresetLogic {
    private subscriber: Subscription;

    protected _startPreset(): void {
        this.subscriber = Actions$.mainBeat.subscribe((velocity) => {
            toVidt(Actions.vidtBeat(velocity));
        });
    }

    protected _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
        }
    }

}
