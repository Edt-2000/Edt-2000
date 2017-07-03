module.exports = {
    addMidiListener: addMidiListener
};

import {midiCCMsg, midiMsgTypes, midiProgramMsg} from "./types";
const easymidi = require('easymidi');

// --------------------------------

// Init callbacks array object
interface Callback {
    [key:string]: (() => void)[]
}
let callbacks: Callback = {};
callbacks[midiMsgTypes[midiMsgTypes.noteon]] = [];
callbacks[midiMsgTypes[midiMsgTypes.noteoff]] = [];
callbacks[midiMsgTypes[midiMsgTypes.control]] = [];
callbacks[midiMsgTypes[midiMsgTypes.program]] = [];
callbacks[midiMsgTypes[midiMsgTypes.select]] = [];

/**
 * Register all events for the virtual device
 * @type {easymidi.Input}
 */
const virtualInput = new easymidi.Input('EDT-SLEDT', true);

virtualInput.on(midiMsgTypes[midiMsgTypes.noteon], handleMidiEvents(midiMsgTypes.noteon));
virtualInput.on(midiMsgTypes[midiMsgTypes.noteoff], handleMidiEvents(midiMsgTypes.noteoff));
virtualInput.on(midiMsgTypes[midiMsgTypes.control], handleMidiEvents(midiMsgTypes.control));
virtualInput.on(midiMsgTypes[midiMsgTypes.program], handleMidiEvents(midiMsgTypes.program));
virtualInput.on(midiMsgTypes[midiMsgTypes.select], handleMidiEvents(midiMsgTypes.select));

/**
 * Try connecting to a live device
 */
try {
    const liveInput = new easymidi.Input('TouchOSC Bridge'); // TODO: add right one
    console.log('Connected to LIVE MIDI device!');

} catch(error) {
    console.info('No LIVE MIDI device available!');
}

/**
 * Add a listener
 * @param midiMsgType
 * @param callback
 */
function addMidiListener(midiMsgType: midiMsgTypes, callback: any) {
    callbacks[midiMsgTypes[midiMsgType]].push(callback);
    return ():void => {
        let index = callbacks[midiMsgType].indexOf(callback);
        if (index >= 0) {
            callbacks[midiMsgType].splice(index, 1);
        }
    };
}

/**
 * Retrieve an event handler for a midi message injected by the addMidiListeners functions
 * @param midiMsgType
 * @return {(msg:(midiCCMsg|midiProgramMsg))=>void}
 */
function handleMidiEvents(midiMsgType: midiMsgTypes) {
    return function(msg: midiCCMsg | midiProgramMsg): void {
        callbacks[midiMsgTypes[midiMsgType]].forEach((callback: any) => { callback(msg) });
    }
}