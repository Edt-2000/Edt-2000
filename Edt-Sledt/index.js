"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
// Sockets
const socket = require('./modules/socket');
socket.connect();
// MIDI
const easymidi = require('easymidi');
const virtualInput = new easymidi.Input('EDT-SLEDT', true);
try {
    const liveInput = new easymidi.Input('TouchOSC Bridge'); // TODO: add right one
    liveInput.on('cc', handlePresetMidi);
    console.log('Success!');
}
catch (error) {
    console.info('No LIVE MIDI device available!');
}
virtualInput.on('cc', handlePresetMidi);
function handlePresetMidi(midiMsg) {
    if (midiMsg.controller in types_1.edtPresets) {
        console.log('Received preset change!', midiMsg.controller, midiMsg.value);
    }
    console.log('cc', midiMsg.controller, midiMsg.value, midiMsg.channel);
    // socket.send({
    //     type: 'cc',
    //     controller: midiMsg.controller,
    //     value: midiMsg.value,
    //     channel: midiMsg.channel
    // });
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
