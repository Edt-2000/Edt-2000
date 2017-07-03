import {edtOutputImplementation} from "../../types";
import {edtVidPresets} from "./presets";

class edtVidt implements edtOutputImplementation {
    register(preset: edtVidPresets): void {
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