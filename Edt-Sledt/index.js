"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
// Sockets
const socket = require('./modules/socket');
socket.connect();
virtualInput.on('cc', handlePresetMidi);
/**
 * Handle a preset change from a MIDI message
 * @param midiCCMsg
 */
function handlePresetMidi(midiCCMsg) {
    if (midiCCMsg.channel === listenToChannel && midiCCMsg.controller in types_1.edtOutputs) {
        console.log(`Preset change for ${midiCCMsg.controller} to ${midiCCMsg.value}`);
        changePreset(midiCCMsg.controller, midiCCMsg.value);
    }
}
function changePreset(device, preset) {
}
virtualInput.on('select', handleSelectMessage);
virtualInput.on('noteon', handleNoteOnMessage);
virtualInput.on('noteoff', handleNoteOffMessage);
function handleSelectMessage(msg) {
    console.log('select', msg.song);
}
function handleNoteOnMessage(msg) {
    console.log('noteon', msg);
    // socket.emit('message', {
    //     type: 'noteon',
    //     note: msg.note,
    //     velocity: msg.velocity,
    //     channel: msg.channel
    // });
}
function handleNoteOffMessage(msg) {
    console.log('noteoff', msg);
    // socket.emit('message', {
    //     type: 'noteoff',
    //     note: msg.note,
    //     velocity: msg.velocity,
    //     channel: msg.channel
    // });
}
