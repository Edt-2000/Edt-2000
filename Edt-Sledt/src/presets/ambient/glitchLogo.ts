import {IPreparePresetMsg, VidtPresets} from '../../../../SharedTypes/socket';
import {sendToVidt} from '../../outputs/edt-vidt';
import {IEdtPreset} from '../presets';
import {BeatMain} from "../../subjects/triggers";

export class GlitchLogo implements IEdtPreset {
    public startPreset(): void {
        sendToVidt({
            preset: VidtPresets.LogoIdle,
        } as IPreparePresetMsg);


    }

    public stopPreset(): void {
        // TODO: Should this reset the edtVidt?
    }

}
