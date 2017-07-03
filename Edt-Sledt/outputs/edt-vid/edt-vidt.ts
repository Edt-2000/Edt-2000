import {edtOutputImplementation, edtOutputs} from "../../types";
import {edtVidPresets} from "./presets";

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

                break;
            default:
                break;
        }
    }

    destroy(): void {
        throw new Error("Method not implemented.");
    }

}