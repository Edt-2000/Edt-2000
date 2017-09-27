import {MidiMsgTypes, midiNoteMsg} from '../types';
import {noteToNote, noteToOctave} from '../utils';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import {virtualMidiInputDevice, virtualMidiOutputDevice} from '../../../SharedTypes/config';

const easymidi = require('easymidi');

// console.log(new easymidi.getInputs());
// const virtualInput = new easymidi.Input('Origin25');
export const virtualInput = new easymidi.Input(virtualMidiInputDevice, true);
export const virtualOutput = new easymidi.Output(virtualMidiOutputDevice, true);


interface easyMidiNoteMsg {
    channel: number,
    note: number,
    velocity: number
}

// Create Observables from the midi stream.
export const sledtNoteOn: Observable<midiNoteMsg> = Observable
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
export const sledtNoteOff: Observable<midiNoteMsg> = Observable
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

// /**
//  * Try connecting to a live device
//  */
// try {
//     const liveInput = new easymidi.Input('TouchOSC Bridge');
//     console.log('Connected to LIVE MIDI device!');
// } catch(error) {
//     console.info('No LIVE MIDI device available!');
// }e
