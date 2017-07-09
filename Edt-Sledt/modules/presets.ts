import {edtVidt} from "../outputs/edt-vid/edt-vidt";
import {preset} from "../outputs/preset";
import {edtOutput, edtOutputs} from "../types";

type edtOutputsObject = {
    [key: string]: preset & edtOutput
}

// Singletons of output implementations
const edtOutputImplementations: edtOutputsObject = {};
edtOutputImplementations[edtOutputs[edtOutputs.EdtVidt]] = new edtVidt();


/**
 * Set a preset on a particular device.
 * @param device
 * @param preset
 * @param velocity
 */
export function initPreset(device: edtOutputs, preset: number, velocity: number): void {
    edtOutputImplementations[edtOutputs[device]].initPreset(preset, velocity);
}

/**
 * Unset a preset of a device
 * @param device
 * @param preset
 */
export function destroyPreset(device: edtOutputs, preset: number): void {
    edtOutputImplementations[edtOutputs[device]].destroyPreset(preset);
}
