import {Colors} from "./colors/colors";
import {Preset} from "./preset";
import {edtOutput} from "../types";
import {Videos} from './videos/videos';
import {Ambient} from './ambient/ambient';


/**
 * Edt Preset MIDI octave number mapping
 */
export enum EdtOutputs {
    colors = 0,
    videos = 1,
    ambient = 2
}

type edtOutputsObject = {
    [key: string]: Preset & edtOutput
}

// Singletons of output implementations
const edtOutputImplementations: edtOutputsObject = {};
edtOutputImplementations[EdtOutputs[EdtOutputs.colors]] = new Colors();
edtOutputImplementations[EdtOutputs[EdtOutputs.videos]] = new Videos();
edtOutputImplementations[EdtOutputs[EdtOutputs.ambient]] = new Ambient();



/**
 * Set a Preset on a particular device.
 * @param device
 * @param preset
 * @param velocity
 */
export function initPreset(device: EdtOutputs, preset: number, velocity: number): void {
    edtOutputImplementations[EdtOutputs[device]].initPreset(preset, velocity);
}

/**
 * Unset a Preset of a device
 * @param device
 * @param preset
 */
export function destroyPreset(device: EdtOutputs, preset: number): void {
    edtOutputImplementations[EdtOutputs[device]].destroyPreset(preset);
}
