import {midiCCMsg, midiMsgTypes, midiNoteMsg, midiProgramMsg, midiSongMsg} from "../types";
import {Observable} from "rxjs/Observable";
import {noteToNote, noteToOctave} from "../modules/utils";
import "rxjs/add/observable/from";

const easymidi = require('easymidi');
const Rx = require('rxjs');

const virtualInput = new easymidi.Input('EDT-SLEDT', true);

// Create Observables from the midi stream
export const NoteOn: Observable<midiNoteMsg> = Rx.Observable.fromEvent(virtualInput, midiMsgTypes.noteon)
    .map((msg): midiNoteMsg => {
        return {
            note: msg.note,
            noteNumber: noteToNote(msg.note),
            octave: noteToOctave(msg.note),
            velocity: msg.velocity,
            channel: msg.channel
        }
    });
export const NoteOff: Observable<midiNoteMsg> = Rx.Observable.fromEvent(virtualInput, midiMsgTypes.noteoff)
    .map((msg: { note: number, velocity: number, channel: number }): midiNoteMsg => {
        return {
            note: msg.note,
            noteNumber: noteToNote(msg.note),
            octave: noteToOctave(msg.note),
            velocity: msg.velocity,
            channel: msg.channel
        };
    });
export const Program: Observable<midiProgramMsg> = Rx.Observable.fromEvent(virtualInput, midiMsgTypes.program);
export const Select: Observable<midiSongMsg> = Rx.Observable.fromEvent(virtualInput, midiMsgTypes.select);
export const CC: Observable<midiCCMsg> = Rx.Observable.fromEvent(virtualInput, midiMsgTypes.cc);

// Loggers
NoteOn.subscribe((msg) => console.log('NoteOn', msg));
NoteOff.subscribe((msg) => console.log('NoteOff', msg));
Program.subscribe((msg) => console.log('Program', msg));
Select.subscribe((msg) => console.log('Select', msg));
CC.subscribe((msg) => console.log('CC', msg));

// /**
//  * Try connecting to a live device
//  */
// try {
//     const liveInput = new easymidi.Input('TouchOSC Bridge');
//     console.log('Connected to LIVE MIDI device!');
// } catch(error) {
//     console.info('No LIVE MIDI device available!');
// }e