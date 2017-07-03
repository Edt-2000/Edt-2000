"use strict";
import {edtOutputs, midiCCMsg} from "./types";
// Sockets
const socket = require('./modules/socket');
socket.connect();


virtualInput.on('cc', handlePresetMidi);


/**
 * Handle a preset change from a MIDI message
 * @param midiCCMsg
 */
function handlePresetMidi(midiCCMsg: midiCCMsg): void {
    if(midiCCMsg.channel === listenToChannel && midiCCMsg.controller in edtOutputs) {
        console.log(`Preset change for ${midiCCMsg.controller} to ${midiCCMsg.value}`);
        changePreset(midiCCMsg.controller, midiCCMsg.value);
    }
}

function changePreset(device: edtOutputs, preset: number): void {

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
