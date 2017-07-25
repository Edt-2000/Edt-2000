///<reference path="../node_modules/@types/node/index.d.ts"/>
import {midiCCMsg, midiMsgTypes, midiNoteMsg, midiProgramMsg, midiSongMsg} from "../types";
import {noteToNote, noteToOctave} from "./utils";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';

const easymidi = require('easymidi');

const virtualInput = new easymidi.Input('EDT-SLEDT', true);

interface easyMidiNoteOnMsg { note: number, velocity: number, channel: number }

// Create Observables from the midi stream
export const NoteOn: Observable<midiNoteMsg> = Observable.fromEvent(virtualInput, midiMsgTypes.noteon)
    .map((msg: easyMidiNoteOnMsg): midiNoteMsg => {
        return {
            note: msg.note,
            noteNumber: noteToNote(msg.note),
            octave: noteToOctave(msg.note),
            velocity: msg.velocity,
            channel: msg.channel
        }
    });
export const NoteOff: Observable<midiNoteMsg> = Observable.fromEvent(virtualInput, midiMsgTypes.noteoff)
    .map((msg: easyMidiNoteOnMsg): midiNoteMsg => {
        return {
            note: msg.note,
            noteNumber: noteToNote(msg.note),
            octave: noteToOctave(msg.note),
            velocity: msg.velocity,
            channel: msg.channel
        };
    });
export const Program: Observable<midiProgramMsg> = Observable.fromEvent(virtualInput, midiMsgTypes.program);
export const Select: Observable<midiSongMsg> = Observable.fromEvent(virtualInput, midiMsgTypes.select);
export const CC: Observable<midiCCMsg> = Observable.fromEvent(virtualInput, midiMsgTypes.cc);

// Loggers
// NoteOn.subscribe((msg) => console.log('NoteOn', msg));
// NoteOff.subscribe((msg) => console.log('NoteOff', msg));
// Program.subscribe((msg) => console.log('Program', msg));
// Select.subscribe((msg) => console.log('Select', msg));
// CC.subscribe((msg) => console.log('CC', msg));

// /**
//  * Try connecting to a live device
//  */
// try {
//     const liveInput = new easymidi.Input('TouchOSC Bridge');
//     console.log('Connected to LIVE MIDI device!');
// } catch(error) {
//     console.info('No LIVE MIDI device available!');
// }e