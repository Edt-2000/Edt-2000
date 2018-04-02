import {Subscription} from 'rxjs/Subscription';
import {sendToVidt} from '../../outputs/edt-vidt';
import {IIntensityMsg, IPreparePresetMsg, VidtPresets} from '../../../../SharedTypes/socket';
import {PresetLogic} from '../presets-logic';
import {BeatMain} from '../../subjects/triggers';

export class BeatToVidtBounce extends PresetLogic {
    title = 'Beat To Vidt Bounce';

    private subscriber: Subscription;

    public _startPreset(listenTo: number): void {
        sendToVidt({
            preset: VidtPresets.PhotoBounce,
        } as IPreparePresetMsg);

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
