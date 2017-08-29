import {edtPreset} from '../../types';
import {filteredNoteOn} from '../../communication/midi';
import {Subscription} from 'rxjs/Subscription';
import {sendToVidt} from '../../communication/socket';
import {colorMsg, intensityMsg} from '../../../../SharedTypes/socket';
import {rescale} from '../../utils';
import 'rxjs/add/operator/filter';
import {EdtColor} from '../../outputs/shared-subjects';

/**
 * The bg color cycle Preset cycles between colors trigger by filteredNoteOn inputs
 */
export class BgColorCycle implements edtPreset {
    private _hue: number;

    private _triggerSubscriber: Subscription;

    private _rotationVelocity: number;

    constructor() {
        this._hue = 0;
        this._rotationVelocity = 0;
    }

    startPreset(rotationVelocity: number): void {
        this._rotationVelocity = rotationVelocity;

        this._triggerSubscriber = filteredNoteOn.subscribe(() => {
            this._hue = (this._hue + rescale(this._rotationVelocity, 127, 0, 360)) % 360;
            let newColor: colorMsg = {
                bgColor: {
                    hue: this._hue,
                    saturation: 100,
                    brightness: 50
                },
                color: {
                    hue: (this._hue + 180) % 360,
                    saturation: 100,
                    brightness: 50
                }
            };
            // Emit this new color value to other listeners
            EdtColor.next(newColor);
        });
    }

    stopPreset(): void {
        if (typeof this._triggerSubscriber !== 'undefined') this._triggerSubscriber.unsubscribe();
    }

}