import {edtPreset} from '../../types';
import {NoteOn} from '../../modules/midi';
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

    private _channelSubscriber: Subscription;
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
    }

    startPreset(rotationVelocity: number): void {
        this._rotationVelocity = rotationVelocity;

        /**
         * You can set the note and the rotation velocity by sending the note you want to listen to on channel 15
         * @type {Subscription}
         * @private
         */
        this._settingSubscriber = NoteOn.subscribe((msg) => {
            if(msg.channel === 15) {
                console.log(`Starting to respond to note ${msg.noteNumber} of octave ${msg.octave} on channel ${msg.velocity}.`);
                this._listenToNote = msg.note;
                this._listenToChannel = msg.velocity;
            }
        });

        this._triggerSubscriber = NoteOn.subscribe((msg) => {
            // Is the received note the one we listen to?
            if (msg.note === this._listenToNote && msg.channel === this._listenToChannel) {
                this._hue = (this._hue + rescale(this._rotationVelocity, 127, 0, 360)) % 360;
                // Send a simple colorMsg to rotate color
                let socketMsg: colorMsg = {
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

                sendToVidt(socketMsg);
            }
        });
    }

    stopPreset(): void {
        if (typeof this._triggerSubscriber !== 'undefined') this._triggerSubscriber.unsubscribe();
        if (typeof this._settingSubscriber !== 'undefined') this._settingSubscriber.unsubscribe();
        if (typeof this._channelSubscriber !== 'undefined') this._channelSubscriber.unsubscribe();
    }

}