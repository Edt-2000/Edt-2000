import {midiCCMsg, MidiMsgTypes, midiNoteMsg, midiProgramMsg, midiSongMsg} from '../types';
import {noteToNote, noteToOctave} from '../utils';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import {listenToChannel, listenToNote} from '../index';
import {adjustmentChannel, virtualMidiDevice, presetMsgChannel} from '../../../SharedTypes/config';
import {edtPresets} from '../presets/presets';

const easymidi = require('easymidi');

// console.log(new easymidi.getInputs());
const virtualInput = new easymidi.Input(virtualMidiDevice, true);
// const virtualInput = new easymidi.Input('Origin25');


interface easyMidiNoteMsg {
    channel: number,
    note: number,
    velocity: number
}

// Create Observables from the midi stream.
const sledtNoteOn: Observable<midiNoteMsg> = Observable
    .fromEvent<easyMidiNoteMsg>(virtualInput, MidiMsgTypes.noteon)
    .map((msg): midiNoteMsg => {
        return {
            note: msg.note,
            noteNumber: noteToNote(msg.note),
            octave: noteToOctave(msg.note),
            velocity: msg.velocity,
            channel: msg.channel + 1
        }
    });
const sledtNoteOff: Observable<midiNoteMsg> = Observable
    .fromEvent<easyMidiNoteMsg>(virtualInput, MidiMsgTypes.noteoff)
    .map((msg): midiNoteMsg => {
        return {
            note: msg.note,
            noteNumber: noteToNote(msg.note),
            octave: noteToOctave(msg.note),
            velocity: msg.velocity,
            channel: msg.channel + 1
        };
    });

export const noteOn: Observable<midiNoteMsg> = sledtNoteOn.filter((msg) => msg.channel !== presetMsgChannel || msg.channel !== adjustmentChannel);
export const noteOff: Observable<midiNoteMsg> = sledtNoteOff.filter((msg) => msg.channel !== presetMsgChannel || msg.channel !== adjustmentChannel);

export const presetNoteOn: Observable<midiNoteMsg> = sledtNoteOn.filter((msg) => msg.channel === presetMsgChannel);
export const presetNoteOff: Observable<midiNoteMsg> = sledtNoteOff.filter((msg) => msg.channel === presetMsgChannel);

export const adjustmentNoteOn: Observable<midiNoteMsg> = sledtNoteOn.filter((msg) => msg.channel === adjustmentChannel);
export const adjustmentNoteOff: Observable<midiNoteMsg> = sledtNoteOff.filter((msg) => msg.channel === adjustmentChannel);

export const Program: Observable<midiProgramMsg> = Observable.fromEvent<midiProgramMsg>(virtualInput, MidiMsgTypes.program)
    .filter((msg) => msg.channel !== presetMsgChannel || msg.channel !== adjustmentChannel);

export const Select: Observable<midiSongMsg> = Observable.fromEvent<midiSongMsg>(virtualInput, MidiMsgTypes.select)
    .filter((msg: midiSongMsg) => msg.channel !== presetMsgChannel || msg.channel !== adjustmentChannel);

export const CC: Observable<midiCCMsg> = Observable.fromEvent<midiCCMsg>(virtualInput, MidiMsgTypes.cc)
    .filter((msg) => msg.channel !== presetMsgChannel || msg.channel !== adjustmentChannel);

// Loggers, comment to disable
// noteOn.subscribe((msg) => console.log('NoteOn', msg));
// noteOff.subscribe((msg) => console.log('NoteOff', msg));
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
