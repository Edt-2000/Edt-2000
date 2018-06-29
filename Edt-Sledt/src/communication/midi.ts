import easymidi = require('easymidi');
import {Observable} from 'rxjs/Observable';
import {
    automationChannel, virtualMidiInputDevice,
    virtualMidiOutputDevice,
} from '../../../Shared/config';
import {IMidiCCMsg, IMidiNoteMsg, IMidiProgramMsg, IMidiSongMsg, IPresetMsg, MidiMsgTypes} from '../../../Shared/types';
import {noteToNote, noteToOctave} from '../../../Shared/utils';
import {map} from 'rxjs/operators';
import {fromEvent} from 'rxjs/observable/fromEvent';

// const virtualInput = new easymidi.Input(virtualMidiInputDevice, true);
const virtualInput = new easymidi.Input('EDTMID USB MIDI Interface');
const virtualOutput = new easymidi.Output(virtualMidiOutputDevice, true);

// console.log(new easymidi.getInputs());
// try {
//     const hardwareInput = new easymidi.Input('EDTMID USB MIDI Interface');
// } catch(error) {
//     console.error('No live MIDI interface!');
// }


interface IEasyMidiNoteMsg {
    channel: number;
    note: number;
    velocity: number;
}

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
export const Program$: Observable<IMidiProgramMsg> = fromEvent<IMidiProgramMsg>(virtualInput, MidiMsgTypes.program).pipe(map(program => ({...program, channel: program.channel + 1})));

export const Select$: Observable<IMidiSongMsg> = fromEvent<IMidiSongMsg>(virtualInput, MidiMsgTypes.select).pipe(map(select => ({...select, channel: select.channel + 1})));

export const Clock$: Observable<void> = fromEvent<void>(virtualInput, MidiMsgTypes.clock);

export const CC$: Observable<IMidiCCMsg> = fromEvent<IMidiCCMsg>(virtualInput, MidiMsgTypes.cc).pipe(map(cc => ({...cc, channel: cc.channel + 1})));

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
