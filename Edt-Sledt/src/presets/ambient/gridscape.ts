import {BeatMain} from '../../subjects/triggers';
import {IIntensityMsg, IPreparePresetMsg, VidtPresets} from '../../../../SharedTypes/socket';
import {sendToVidt} from '../../outputs/edt-vidt';
import {IEdtPreset} from '../presets';

export class Gridscape implements IEdtPreset {
    private subscription;

    public startPreset(intensity): void {
        sendToVidt({
            preset: VidtPresets.Gridscape,
        } as IPreparePresetMsg);

        this.subscription = BeatMain
            .subscribe(() => {
                sendToVidt({intensity} as IIntensityMsg);
            });
    }

    public stopPreset(): void {
        if (typeof this.subscription !== 'undefined') {
            this.subscription.unsubscribe();
        }
    }

}
