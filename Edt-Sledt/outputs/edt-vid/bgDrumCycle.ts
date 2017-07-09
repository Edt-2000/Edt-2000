import {edtPreset} from "../../types";
import {NoteOn} from "../../modules/midi";
import {Subscription} from "rxjs/Subscription";
import {sendToVidt} from "../../modules/socket";
import {drumCycleMsg} from "../../../SharedTypes/socket";

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
        this.subscriber = NoteOn.subscribe((msg) => {
            // Respond to Kick Drums on channel 10, note 1
            if (msg.channel === 9 && msg.noteNumber === 1) {
                this.hue = (this.hue + velocity) % 255;

                let socketMsg: drumCycleMsg = {
                    bgColor: {
                        hue: this.hue,
                        saturation: 100,
                        brightness: 50
                    },
                };

                sendToVidt(socketMsg);
            }
        });
    }

    stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
        }
    }

}