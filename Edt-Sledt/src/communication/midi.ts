import easymidi = require('easymidi');
import {Observable} from 'rxjs/Observable';
import {
    automationChannel,
    hardwareMidiInput,
    virtualMidiInputDevice,
    virtualMidiOutputDevice,
} from '../../../Shared/config';
import {IMidiCCMsg, IMidiNoteMsg, IMidiProgramMsg, IMidiSongMsg, IPresetMsg, MidiMsgTypes} from '../../../Shared/types';
import {bufferCount, map,} from 'rxjs/operators';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {merge} from 'rxjs/observable/merge';
import {noteToNote, noteToOctave} from "../../../Shared/utils";

const virtualInput = new easymidi.Input(virtualMidiInputDevice, true);
const virtualOutput = new easymidi.Output(virtualMidiOutputDevice, true);
const argv = require('minimist')(process.argv.slice(2));

// TODO: a bit ugly, but currently no real alternative
let hardwareInput;
let getMidiObservable = <T>(eventName: MidiMsgTypes) => fromEvent<T>(virtualInput, eventName);

if (argv.hardwaremidi) {
    // const inputs = easymidi.getInputs();
    console.log('MIDI hardware enabled');
    hardwareInput = new easymidi.Input(hardwareMidiInput);
    getMidiObservable = <T>(eventName: MidiMsgTypes) => merge(
        fromEvent<T>(virtualInput, eventName),
        fromEvent<T>(hardwareInput, eventName),
    );
}

interface IEasyMidiNoteMsg {
    channel: number;
    note: number;
    velocity: number;
}

export const sledtNoteOn$: Observable<IMidiNoteMsg> = getMidiObservable<IMidiNoteMsg>(MidiMsgTypes.noteon).pipe(
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
export const sledtNoteOff$: Observable<IMidiNoteMsg> = getMidiObservable<IMidiNoteMsg>(MidiMsgTypes.noteoff).pipe(
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
export const program$: Observable<IMidiProgramMsg> = getMidiObservable<IMidiProgramMsg>(MidiMsgTypes.program).pipe(map(program => ({
    ...program,
    channel: program.channel + 1
})));
export const select$: Observable<IMidiSongMsg> = getMidiObservable<IMidiSongMsg>(MidiMsgTypes.select).pipe(map(select => ({
    ...select,
    channel: select.channel + 1
})));
export const clock$: Observable<void> = getMidiObservable<void>(MidiMsgTypes.clock);
export const BPM$: Observable<void> = clock$.pipe(bufferCount(24), map(() => {
}));
export const CC$: Observable<IMidiCCMsg> = getMidiObservable<IMidiCCMsg>(MidiMsgTypes.cc).pipe(map(cc => ({
    ...cc,
    channel: cc.channel + 1
})));

export function sendMIDIPreset(msg: IPresetMsg) {
    const midiMsg: IEasyMidiNoteMsg = {
        channel: automationChannel - 1,
        note: msg.preset,
        velocity: msg.modifier,
    };
    if (msg.state) {
        virtualOutput.send('noteon', midiMsg);
    } else {
        virtualOutput.send('noteoff', midiMsg);
    }
}

export function sendMIDICC({controller, value, channel}: IMidiCCMsg) {
    virtualOutput.send('cc', {
        controller,
        value,
        channel: channel - 1,
    });
}
