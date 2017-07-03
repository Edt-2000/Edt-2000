import {midiCCMsg, midiMsgTypes, midiNoteMsg, midiProgramMsg} from "./types";
const easymidi = require('easymidi');

// --------------------------------

// Init callbacks array object
interface Callbacks {
    [key:string]: midiMessageHandler[]
}
export interface midiMessageHandler {
    (msg:(midiCCMsg|midiProgramMsg|midiNoteMsg)):void
}
let callbacks: Callbacks = {};
callbacks[midiMsgTypes[midiMsgTypes.noteon]] = [];
callbacks[midiMsgTypes[midiMsgTypes.noteoff]] = [];
callbacks[midiMsgTypes[midiMsgTypes.cc]] = [];
callbacks[midiMsgTypes[midiMsgTypes.program]] = [];
callbacks[midiMsgTypes[midiMsgTypes.select]] = [];

/**
 * Register all events for the virtual device
 * @type {easymidi.Input}
 */
const virtualInput = new easymidi.Input('EDT-SLEDT', true);

virtualInput.on(midiMsgTypes[midiMsgTypes.noteon], handleMidiEvents(midiMsgTypes.noteon));
virtualInput.on(midiMsgTypes[midiMsgTypes.noteoff], handleMidiEvents(midiMsgTypes.noteoff));
virtualInput.on(midiMsgTypes[midiMsgTypes.cc], handleMidiEvents(midiMsgTypes.cc));
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
export function addMidiListener(midiMsgType: midiMsgTypes, callback: midiMessageHandler) {
    callbacks[midiMsgTypes[midiMsgType]].push(callback);
    console.log('Added listener', callbacks[midiMsgTypes[midiMsgType]]);
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
 * @return {}
 */
function handleMidiEvents(midiMsgType: midiMsgTypes) {
    return function(msg: midiCCMsg | midiProgramMsg): void {
        // console.log('Handling MIDI event:', msg, midiMsgTypes[midiMsgType]);
        callbacks[midiMsgTypes[midiMsgType]].forEach((callback: midiMessageHandler) => { callback(msg) });
    }
}