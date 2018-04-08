import {Subscription} from 'rxjs/Subscription';
import {sendToVidt} from '../../outputs/edt-vidt';
import {IIntensityMsg, IPreparePresetMsg, VidtPresets} from '../../../../Shared/socket';
import {IEdtPresetLogic} from '../presets';
import {BeatMain} from '../../subjects/triggers';

export class BeatToVidtBounce implements IEdtPresetLogic {
    private subscriber: Subscription;

    public startPreset(listenTo: number): void {
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

    public stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
        }
    }

}
