"use strict";
import {edtOutputs} from "./types";
import {NoteOn} from "./midi";

// Midi
const presetMsgChannel: number = 15;

// Listen to PresetChange note messages
NoteOn.subscribe((msg) => {
    if (msg.channel === presetMsgChannel && msg.octave in edtOutputs) {
        console.log('Change preset!');
    }
});

//
// function handleUnsetPreset(presetNote: midiNoteMsg): void {
//     // console.log('Midi note off:', presetNote);
//     if (presetNote.channel === presetMsgChannel && noteToOctave(presetNote.note) in edtOutputs) {
//         unsetPreset(noteToOctave(presetNote.note), noteToNote(presetNote.note));
//     }
// }
//
// /**
//  * Set a preset on a particular device.
//  * @param device
//  * @param preset
//  */
// function setPreset(device: edtOutputs, preset: number): void {
//
// }