import {edtPreset} from '../../types';
import {NoteOn} from '../../modules/midi';
import {Subscription} from 'rxjs/Subscription';
import {sendToVidt} from '../../modules/socket';
import {centeredText, vidtPresets} from '../../../SharedTypes/socket';
import {rescale} from '../../modules/utils';

/**
 * The BG Drum Cycle preset cycles between colors trigger by kick drum inputs (BEAT)
 */
export class bgDrumCycle implements edtPreset {
    private subscriber: Subscription;
    private hue: number;

    constructor() {
        this.hue = 0;
    }

    startPreset(velocity: number): void {
        // Prep
        sendToVidt({preset: vidtPresets.TextDisplay});

        this.subscriber = NoteOn.subscribe((msg) => {
            // Respond to Kick Drums on channel 10, note 1
            if (msg.channel === 9 && msg.noteNumber === 3) {
                this.hue = (this.hue + rescale(velocity, 127, 0, 360)) % 360;

                let socketMsg: centeredText = {
                    bgColor: {
                        hue: this.hue,
                        saturation: 100,
                        brightness: 50
                    },
                    color: {
                        hue: (this.hue + 180) % 360,
                        saturation: 100,
                        brightness: 50
                    },
                    textValue: `${this.hue}`
                };

                sendToVidt(socketMsg);
            }
        });
    }

    stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
            sendToVidt({preset: vidtPresets.LogoIdle});
        }
    }

}