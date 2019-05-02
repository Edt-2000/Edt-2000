import easymidi = require("easymidi");
import { IMidiCCMsg, IMidiProgramMsg, IMidiSongMsg, MidiMsgTypes } from "../../Shared/types";
import { fromEvent } from "rxjs/internal/observable/fromEvent";
import { map } from "rxjs/operators";
import { merge } from "rxjs/internal/observable/merge";
import { convertToOSC } from "edt-slet/src/communication/osc";

const argv = require("minimist")(process.argv.slice(2));
const virtualAutomationInput = new easymidi.Input(argv.midiInput, !!argv.midiInputVirtual);

const getMidiObservable = <T>(eventName: MidiMsgTypes) => fromEvent<T>(virtualAutomationInput, eventName);

interface IEasyMidiNoteMsg {
    noteOn: boolean;
    channel: number;
    note: number;
    velocity: number;
}

const noteOn$ = getMidiObservable<IEasyMidiNoteMsg>(MidiMsgTypes.noteon).pipe(
    map(
        (msg): IEasyMidiNoteMsg => {
            return {
                noteOn: true,
                channel: msg.channel + 1,
                note: msg.note,
                velocity: msg.velocity,
            };
        },
    ),
);
const noteOff$ = getMidiObservable<IEasyMidiNoteMsg>(MidiMsgTypes.noteoff).pipe(
    map(
        (msg): IEasyMidiNoteMsg => {
            return {
                noteOn: false,
                channel: msg.channel + 1,
                note: msg.note,
                velocity: msg.velocity,
            };
        },
    ),
);
const program$ = getMidiObservable<IMidiProgramMsg>(MidiMsgTypes.program).pipe(
    map(program => ({
        ...program,
        channel: program.channel + 1,
    })),
);
const select$ = getMidiObservable<IMidiSongMsg>(MidiMsgTypes.select).pipe(
    map(select => ({
        ...select,
        channel: select.channel + 1,
    })),
);
const clock$ = getMidiObservable<void>(
    MidiMsgTypes.clock,
);

const CC$ = getMidiObservable<IMidiCCMsg>(
    MidiMsgTypes.cc,
).pipe(
    map(cc => ({
        ...cc,
        channel: cc.channel + 1,
    })),
);

merge(
    noteOff$,
    noteOn$,
    program$,
    select$,
    clock$,
    CC$,
).pipe(
    map(convertToOSC),
);
