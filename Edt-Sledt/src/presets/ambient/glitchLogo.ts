import {edtPreset} from '../../types';
import {sendToVidt} from '../../communication/socket';
import {preparePresetMsg, VidtPresets} from '../../../../SharedTypes/socket';
import {OSCInput} from '../../communication/osc';

export class GlitchLogo implements edtPreset {
    startPreset(): void {
        sendToVidt(<preparePresetMsg>{
            preset: VidtPresets.LogoIdle
        });
    }

    stopPreset(): void {

    }

}
