"use strict";
import {edtPresets, midiCCMsg} from "./types";
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

} catch(error) {
    console.info('No LIVE MIDI device available!');
}

virtualInput.on('cc', handlePresetMidi);

function handlePresetMidi(midiMsg: midiCCMsg): void {
    if(midiMsg.controller in edtPresets) {
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

function handleSelectMessage(msg:any) {
    console.log('select', msg.song);
}

function handleNoteOnMessage(msg:any) {
    console.log('noteon', msg);
    // socket.emit('message', {
    //     type: 'noteon',
    //     note: msg.note,
    //     velocity: msg.velocity,
    //     channel: msg.channel
    // });
}

function handleNoteOffMessage(msg:any) {
    console.log('noteoff', msg);
    // socket.emit('message', {
    //     type: 'noteoff',
    //     note: msg.note,
    //     velocity: msg.velocity,
    //     channel: msg.channel
    // });
}


// const OSC = require('osc-js');
// const options = {
//     type: 'udp4',
//     send: {
//         host: 'localhost'
//     }
// };
// const osc = new OSC({
//     plugin: new OSC.DatagramPlugin(options)
// });
//
// osc.on('open', () => {
//     console.log('START');
//
//
//     input.on('noteon', function (msg) {
//         console.log('noteon', msg.note, msg.velocity, msg.channel);
//         osc.send(new OSC.NoteMessage('/ON', msg.note, msg.velocity, msg.channel), {port: 12345});
//     });
//
//     input.on('noteoff', function (msg) {
//         console.log('noteoff', msg.note, msg.velocity, msg.channel);
//         osc.send(new OSC.NoteMessage('/OF', msg.note, msg.velocity, msg.channel), {port: 12345});
//     });
//
// });
//
// osc.open();
//
// // /TP 2 [start: int] [end: int] [h: int] [s: int] [l: int] [duration: int]

// //
// input.on('program', function (msg) {
//     console.log('program', msg.number, msg.channel);
// });
//
// input.on('pitch', function (msg) {
//     console.log('pitch', msg.value, msg.channel);
// });
//
// input.on('position', function (msg) {
//     console.log('position', msg.value);
// });
//

//
// input.on('start', function () {
//     console.log('start');
// });
//
// input.on('continue', function () {
//     console.log('continue');
// });
//
// input.on('stop', function () {
//     console.log('stop');
// });
//
// input.on('reset', function () {
//     console.log('reset');
// });
