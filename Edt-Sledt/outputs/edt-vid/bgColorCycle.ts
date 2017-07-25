import {edtPreset} from '../../types';
import {adjustmentChannel, NoteOn} from '../../modules/midi';
import {Subscription} from 'rxjs/Subscription';
import {sendToVidt} from '../../modules/socket';
import {colorMsg} from '../../../SharedTypes/socket';
import {rescale} from '../../modules/utils';

/**
 * The bg color cycle preset cycles between colors trigger by NoteOn inputs, which can be changed by sending a Note on channel 15
 * The velocity of the preset is the channel that is being listened to (1-14)
 */
export class bgColorCycle implements edtPreset {
    private _hue: number;

    private _triggerSubscriber: Subscription;
    private _settingSubscriber: Subscription;

    private _listenToChannel: number;
    private _listenToNote: number;
    private _rotationVelocity: number;

    constructor() {
        this._hue = 0;
        this._listenToChannel = 0;
        this._listenToNote = 0;
        this._rotationVelocity = 0;
        /**
         * You can set the note and the rotation velocity by sending the note you want to listen to on channel 15
         * @type {Subscription}
         * @private
         */
        this._settingSubscriber = NoteOn.subscribe((msg) => {
            if(msg.channel === adjustmentChannel) {
                console.log(`Setting note ${msg.noteNumber} of octave ${msg.octave} on channel ${msg.velocity} as responsive note.`);
                this._listenToNote = msg.note;
                this._listenToChannel = msg.velocity;
            }
        });
    }

    startPreset(rotationVelocity: number): void {
        this._rotationVelocity = rotationVelocity;

        this._triggerSubscriber = NoteOn.subscribe((msg) => {
            // Is the received note the one we listen to?
            if (msg.note === this._listenToNote && msg.channel === this._listenToChannel) {
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
            }
        });
    }

    stopPreset(): void {
        if (typeof this._triggerSubscriber !== 'undefined') this._triggerSubscriber.unsubscribe();
        if (typeof this._settingSubscriber !== 'undefined') this._settingSubscriber.unsubscribe();
    }

}