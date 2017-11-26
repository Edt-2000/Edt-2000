import easymidi = require('easymidi');
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/bufferCount';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/take';
import {Observable} from 'rxjs/Observable';
import {
    adjustmentChannel,
    presetMsgChannel,
    virtualMidiInputDevice,
    virtualMidiOutputDevice,
} from '../../../SharedTypes/config';
import {IMidiCCMsg, IMidiNoteMsg, IMidiProgramMsg, IMidiSongMsg, MidiMsgTypes} from '../types';
import {noteToNote, noteToOctave} from '../utils';

// console.log(new easymidi.getInputs());
export const virtualOutput = new easymidi.Output(virtualMidiOutputDevice, true);
// TODO: TryCatch or something like that to prevent failing when device is not connected
// const hardwareInput = new easymidi.Input('EDTMID USB MIDI Interface');
const virtualInput = new easymidi.Input(virtualMidiInputDevice, true);

interface IEasyMidiNoteMsg {
    channel: number;
    note: number;
    velocity: number;
}

// Create Observables from the midi stream.
export const sledtNoteOn$: Observable<IMidiNoteMsg> = Observable
    .fromEvent<IEasyMidiNoteMsg>(virtualInput, MidiMsgTypes.noteon)
    .map((msg): IMidiNoteMsg => {
        return {
            noteOn: true,
            note: msg.note,
            noteNumber: noteToNote(msg.note),
            octave: noteToOctave(msg.note),
            velocity: msg.velocity,
            channel: msg.channel + 1,
        };
    });
export const sledtNoteOff$: Observable<IMidiNoteMsg> = Observable
    .fromEvent<IEasyMidiNoteMsg>(virtualInput, MidiMsgTypes.noteoff)
    .map((msg): IMidiNoteMsg => {
        return {
            noteOn: false,
            note: msg.note,
            noteNumber: noteToNote(msg.note),
            octave: noteToOctave(msg.note),
            velocity: msg.velocity,
            channel: msg.channel + 1,
        };
    });

export const Program$: Observable<IMidiProgramMsg> = Observable.fromEvent<IMidiProgramMsg>(virtualInput, MidiMsgTypes.program)
    .filter((msg) => msg.channel !== presetMsgChannel || msg.channel !== adjustmentChannel);

export const Select$: Observable<IMidiSongMsg> = Observable.fromEvent<IMidiSongMsg>(virtualInput, MidiMsgTypes.select)
    .filter((msg: IMidiSongMsg) => msg.channel !== presetMsgChannel || msg.channel !== adjustmentChannel);

export const CC$: Observable<IMidiCCMsg> = Observable.fromEvent<IMidiCCMsg>(virtualInput, MidiMsgTypes.cc)
    .filter((msg) => msg.channel !== presetMsgChannel || msg.channel !== adjustmentChannel);

// export const Clock$: Observable<null> = Observable.fromEvent<null>(hardwareInput, MidiMsgTypes.clock);

// /**
//  * Try connecting to a live device
//  */
// try {
//     const liveInput = new easymidi.Input('TouchOSC Bridge');
//     console.log('Connected to LIVE MIDI device!');
// } catch(error) {
//     console.info('No LIVE MIDI device available!');
// }e
