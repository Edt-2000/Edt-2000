"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const presets_1 = require("./presets");
class edtVidt {
    register(preset) {
        switch (preset) {
            case presets_1.edtVidPresets.backgroundColorChanger:
                break;
            default:
                break;
        }
    }
    destroy() {
        throw new Error("Method not implemented.");
    }
}
