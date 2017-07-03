"use strict";
import {edtOutputImplementation, edtOutputs, midiCCMsg, midiMsgTypes} from "./types";
import {edtVidt} from "./outputs/edt-vid/edt-vidt";
import {addMidiListener} from './midi';

// Midi
const presetMsgChannel: number = 15;

// Timeout
import Timer = NodeJS.Timer;
let callbackTimeout: Timer = setTimeout(() => undefined, 0);

// Implementations
const edtOutputImplementations: edtOutputImplementation[] = [
    new edtVidt
];

/**
 * Handle preset change messages
 */
addMidiListener(midiMsgTypes.cc, handlePresetMidi);

/**
 * Handle a preset change from a MIDI message
 * @param midiCCMsg
 */
function handlePresetMidi(midiCCMsg: midiCCMsg): void {
    if (midiCCMsg.channel === presetMsgChannel && midiCCMsg.controller in edtOutputs) {
        console.log(`Preset cude for ${edtOutputs[midiCCMsg.controller]} to ${midiCCMsg.value}`);
        clearTimeout(callbackTimeout);
        callbackTimeout = setTimeout(function() {
            changePreset(midiCCMsg.controller, midiCCMsg.value);
        }, 500);
    }
}

/**
 * Change a preset on a particular device.
 * @param device
 * @param preset
 */
function changePreset(device: edtOutputs, preset: number): void {
    const implementation = edtOutputImplementations.find((output: edtOutputImplementation) => output.edtOutputId === device);
    if (implementation && implementation.activePreset !== preset) implementation.register(preset);
}


// socket.emit('message', {
//     type: 'noteon',
//     note: msg.note,
//     velocity: msg.velocity,
//     channel: msg.channel
// });

// socket.emit('message', {
//     type: 'noteoff',
//     note: msg.note,
//     velocity: msg.velocity,
//     channel: msg.channel
// });

