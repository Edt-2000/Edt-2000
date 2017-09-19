import {sendToVidt} from '../../outputs/edt-vidt';
import {preparePresetMsg, VidtPresets} from '../../../../SharedTypes/socket';
import {edtPreset} from '../presets';

export class GlitchLogo implements edtPreset {
    startPreset(): void {
        sendToVidt(<preparePresetMsg>{
            preset: VidtPresets.LogoIdle
        });
    }

    stopPreset(): void {
        // TODO: Should this reset the edtVidt?
    }

}
