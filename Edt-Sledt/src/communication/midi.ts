import easymidi = require('easymidi');
import {Observable} from 'rxjs/Observable';
import {
    adjustmentChannel, presetMsgChannel, virtualMidiInputDevice,
    virtualMidiOutputDevice,
} from '../../../Shared/config';
import {IMidiCCMsg, IMidiNoteMsg, IMidiProgramMsg, IMidiSongMsg, MidiMsgTypes} from '../../../Shared/types';
import {noteToNote, noteToOctave} from '../../../Shared/utils';
import {filter, map} from 'rxjs/operators';
import {fromEvent} from 'rxjs/observable/fromEvent';

// console.log(new easymidi.getInputs());
export const virtualOutput = new easymidi.Output(virtualMidiOutputDevice, true);

// try {
//     const hardwareInput = new easymidi.Input('EDTMID USB MIDI Interface');
// } catch(error) {
//     console.error('No live MIDI interface!');
// }

const virtualInput = new easymidi.Input(virtualMidiInputDevice, true);

interface IEasyMidiNoteMsg {
    channel: number;
    note: number;
    velocity: number;
}

// Create Observables from the midi stream.
export const sledtNoteOn$: Observable<IMidiNoteMsg> = fromEvent<IEasyMidiNoteMsg>(virtualInput, MidiMsgTypes.noteon).pipe(
        map((msg): IMidiNoteMsg => {
            return {
                noteOn: true,
                note: msg.note,
                noteNumber: noteToNote(msg.note),
                octave: noteToOctave(msg.note),
                velocity: msg.velocity,
                channel: msg.channel + 1,
            };
        }),
    );
export const sledtNoteOff$: Observable<IMidiNoteMsg> = fromEvent<IEasyMidiNoteMsg>(virtualInput, MidiMsgTypes.noteoff).pipe(
        map((msg): IMidiNoteMsg => {
            return {
                noteOn: false,
                note: msg.note,
                noteNumber: noteToNote(msg.note),
                octave: noteToOctave(msg.note),
                velocity: msg.velocity,
                channel: msg.channel + 1,
            };
        })
    );

export const Program$: Observable<IMidiProgramMsg> = fromEvent<IMidiProgramMsg>(virtualInput, MidiMsgTypes.program).pipe(
    filter((msg) => msg.channel !== presetMsgChannel || msg.channel !== adjustmentChannel)
);

export const Select$: Observable<IMidiSongMsg> = fromEvent<IMidiSongMsg>(virtualInput, MidiMsgTypes.select).pipe(
    filter((msg: IMidiSongMsg) => msg.channel !== presetMsgChannel || msg.channel !== adjustmentChannel)
);

export const CC$: Observable<IMidiCCMsg> = fromEvent<IMidiCCMsg>(virtualInput, MidiMsgTypes.cc).pipe(
    filter((msg) => msg.channel !== presetMsgChannel || msg.channel !== adjustmentChannel)
);
