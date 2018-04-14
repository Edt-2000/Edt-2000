import {Subscription} from 'rxjs/Subscription';
import {sendToVidt} from '../../outputs/edt-vidt';
import {IIntensityMsg} from '../../../../Shared/socket';
import {PresetLogic} from '../presets-logic';
import {BeatMain} from '../../subjects/triggers';

export class BeatToVidtBounce extends PresetLogic {
    title = 'Beat To Vidt Bounce';

    private subscriber: Subscription;

    public _startPreset(): void {
        this.subscriber = BeatMain
            .subscribe((note) => {
                sendToVidt({
                    intensity: 100
                } as IIntensityMsg)
            });
    }

    public _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
        }
    }

}
