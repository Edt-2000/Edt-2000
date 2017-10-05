import {Observable} from 'rxjs/Observable';
import {midiCCMsg, MidiMsgTypes, midiNoteMsg, midiProgramMsg, midiSongMsg, PresetMsg} from '../types';
import {adjustmentChannel, presetMsgChannel} from '../../../SharedTypes/config';
import {sledtNoteOff$, sledtNoteOn$, virtualInput} from '../communication/midi';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/share';

export const noteOn: Observable<midiNoteMsg> = sledtNoteOn$.filter((msg) => msg.channel !== presetMsgChannel || msg.channel !== adjustmentChannel);
export const noteOff: Observable<midiNoteMsg> = sledtNoteOff$.filter((msg) => msg.channel !== presetMsgChannel || msg.channel !== adjustmentChannel);

export const adjustmentNoteOn: Observable<midiNoteMsg> = sledtNoteOn$.filter((msg) => msg.channel === adjustmentChannel);
export const adjustmentNoteOff: Observable<midiNoteMsg> = sledtNoteOff$.filter((msg) => msg.channel === adjustmentChannel);

export const Program: Observable<midiProgramMsg> = Observable.fromEvent<midiProgramMsg>(virtualInput, MidiMsgTypes.program)
    .filter((msg) => msg.channel !== presetMsgChannel || msg.channel !== adjustmentChannel);

export const Select: Observable<midiSongMsg> = Observable.fromEvent<midiSongMsg>(virtualInput, MidiMsgTypes.select)
    .filter((msg: midiSongMsg) => msg.channel !== presetMsgChannel || msg.channel !== adjustmentChannel);

export const CC: Observable<midiCCMsg> = Observable.fromEvent<midiCCMsg>(virtualInput, MidiMsgTypes.cc)
    .filter((msg) => msg.channel !== presetMsgChannel || msg.channel !== adjustmentChannel);

const presetOn$: Observable<PresetMsg> = sledtNoteOn$
    .filter((msg) => msg.channel === presetMsgChannel)
    .map((msg): PresetMsg => {
        return {
            preset: msg.note,
            modifier: msg.velocity,
            state: true
        };
    });

const presetOff$: Observable<PresetMsg> = sledtNoteOff$
    .filter((msg) => msg.channel === presetMsgChannel)
    .map((msg): PresetMsg => {
        return {
            preset: msg.note,
            modifier: msg.velocity,
            state: false
        };
    });

export const presetMidi$: Observable<PresetMsg> = presetOn$.merge(presetOff$);



// Loggers, comment to disable
// noteOn.subscribe((msg) => console.log('NoteOn', msg));
// noteOff.subscribe((msg) => console.log('NoteOff', msg));
// Program.subscribe((msg) => console.log('Program', msg));
// Select.subscribe((msg) => console.log('Select', msg));
// CC.subscribe((msg) => console.log('CC', msg));
