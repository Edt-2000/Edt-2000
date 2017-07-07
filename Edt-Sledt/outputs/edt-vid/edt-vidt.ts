import {edtOutputImplementation, edtOutputs} from "../../types";
import {addMidiListener} from "../../midi";
import {addToCallList, callCallList} from "../presetManager";

const socket = require('../../modules/socket');

export class edtVidt implements edtOutputImplementation {
    edtOutputId: edtOutputs;
    activePresets: number[];

    constructor() {
        this.edtOutputId = edtOutputs.EdtVidt;
        this.activePresets = [];
    }

    register(preset: edtVidPresets): void {
        if (preset in this.activePresets) {
            console.log('Preset already active!', this.activePresets);
        } else {
            this.activePresets.push(preset);

            console.log(`Changing preset to ${preset}`);
            switch (preset) {
                case edtVidPresets.backgroundColorChanger:
                    // addToCallList(`o--${this.edtOutputId}--p--${this.activePreset}`, addMidiListener(midiMsgTypes.noteon, (msg: midiNoteMsg) => {
                    //     socket.send(msg);
                    // }));
                    break;
                default:
                    break;
            }
        }
    }

    destroy(preset: edtVidPresets): void {
        this.activePresets.splice(this.activePresets.indexOf(preset), 1);
        console.log('Deleting preset', preset);
        // callCallList(`o--${this.edtOutputId}--p--${this.activePreset}`);
    }

}

export enum edtVidPresets  {
    backgroundColorChanger // Simply change backgroundColorChanger color
}