import {edtOutputImplementation, edtOutputs, midiMsgTypes, midiNoteMsg} from "../../types";
import {edtVidPresets} from "./presets";
import {addMidiListener} from "../../midi";

const socket = require('../../modules/socket');

export class edtVidt implements edtOutputImplementation {
    edtOutputId: edtOutputs;
    activePreset: number;

    constructor() {
        this.edtOutputId = edtOutputs.EdtVidt;
        console.log('Edt-Vidt created');
    }

    register(preset: edtVidPresets): void {
        this.activePreset = preset;
        console.log(`Changing preset to ${preset}`);
        switch (preset) {
            case edtVidPresets.backgroundColorChanger:
                addMidiListener(midiMsgTypes.noteon, (msg:midiNoteMsg) => {
                    // Todo: add parsing to bg color from note
                    // socket.send(msg);
                });
                break;
            default:
                break;
        }
    }

    destroy(): void {
        throw new Error("Method not implemented.");
    }

}