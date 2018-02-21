import { IIntensityMsg, IPreparePresetMsg, VidtPresets } from '../../../../SharedTypes/socket';
import {sendToVidt} from '../../outputs/edt-vidt';
import {IEdtPreset} from '../presets';
import { BeatMain } from '../../subjects/triggers';

export class GlitchLogo implements IEdtPreset {
    private subscription;

    public startPreset(intensity): void {
        sendToVidt({
            preset: VidtPresets.LogoIdle,
        } as IPreparePresetMsg);


        this.subscription = BeatMain
            .subscribe(() => {
                sendToVidt(<IIntensityMsg>{intensity});
            });
    }

    public stopPreset(): void {
        if (typeof this.subscription !== 'undefined') {
            this.subscription.unsubscribe();
        }
    }

}
