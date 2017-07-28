import {edtPreset} from '../../types';
import {filteredNoteOn} from '../../modules/midi';
import {Subscription} from 'rxjs/Subscription';
import {sendToVidt} from '../../modules/socket';
import {colorMsg} from '../../../SharedTypes/socket';
import {rescale} from '../../modules/utils';
import 'rxjs/add/operator/filter';

/**
 * The bg color cycle Preset cycles between colors trigger by NoteOn inputs, which can be changed by sending a Note on channel 15
 * The velocity of the Preset is the channel that is being listened to (1-14)
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

        this._triggerSubscriber = filteredNoteOn
            .subscribe(() => {
                this._hue = (this._hue + rescale(this._rotationVelocity, 127, 0, 360)) % 360;
                // Send a simple colorMsg to rotate color
                sendToVidt(<colorMsg>{
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
                });
            });
    }

    stopPreset(): void {
        if (typeof this._triggerSubscriber !== 'undefined') this._triggerSubscriber.unsubscribe();
    }

}