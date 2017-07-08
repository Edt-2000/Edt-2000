"use strict";
import {edtOutput, edtOutputs} from "./types";
import {NoteOff, NoteOn} from "./inputs/midi";
import {edtVidt} from "./outputs/edt-vid/edt-vidt";
import {preset} from "./outputs/preset";

// Midi settings
const presetMsgChannel: number = 15;

// Singletons of output implementations
type edtOutputsObject = {
    [key:string]:preset & edtOutput
}
const edtOutputImplementations: edtOutputsObject = {};
edtOutputImplementations[edtOutputs[edtOutputs.EdtVidt]] = new edtVidt();

// Listen to PresetChange note messages
NoteOn.subscribe((msg) => {
    if (msg.channel === presetMsgChannel && msg.octave in edtOutputs) {
        edtOutputImplementations[edtOutputs[msg.octave]].initPreset(msg.noteNumber, msg.velocity);
    }
});

NoteOff.subscribe((msg) => {
    if (msg.channel === presetMsgChannel && msg.octave in edtOutputs) {
        edtOutputImplementations[edtOutputs[msg.octave]].destroyPreset(msg.noteNumber);
    }
});

/**
 * Set a preset on a particular device.
 * @param device
 * @param preset
 */
function setPreset(device: edtOutputs, preset: number): void {

}

