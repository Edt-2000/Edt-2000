"use strict";
// Sockets
const socket = require('./modules/socket');
socket.connect();

// MIDI
const easymidi = require('easymidi');
const input = new easymidi.Input('EDT-MIDI', true);


input.on('cc', function (msg) {
    console.log('cc', msg.controller, msg.value, msg.channel);
    socket.send({
        type: 'cc',
        controller: msg.controller,
        value: msg.value,
        channel: msg.channel
    });
});

// input.on('noteon', function (msg) {
//     console.log('noteon', msg);
//     socket.emit('message', {
//         type: 'noteon',
//         note: msg.note,
//         velocity: msg.velocity,
//         channel: msg.channel
//     });
// });

// input.on('noteoff', function (msg) {
//     console.log('noteoff', msg);
//     socket.emit('message', {
//         type: 'noteoff',
//         note: msg.note,
//         velocity: msg.velocity,
//         channel: msg.channel
//     });
// });


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
// input.on('noteoff', function (msg) {
//     console.log('noteoff', msg.note, msg.velocity, msg.channel);
// });
//
// input.on('noteon', function (msg) {
//     console.log('noteon', msg.note, msg.velocity, msg.channel);
// });
//
// input.on('cc', function (msg) {
//     console.log('cc', msg.controller, msg.value, msg.channel);
// });
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
// input.on('select', function (msg) {
//     console.log('select', msg.song);
// });
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
