// import easymidi = require("easymidi");
// import {
//     automationChannel, virtualMidiOutputDevice,
// } from "../../../Shared/config";
// import {
//     IMidiCCMsg,
//     IMidiNoteMsg,
//     IMidiProgramMsg,
//     IMidiSongMsg,
//     IPresetMsg,
//     MidiMsgTypes,
// } from "../../../Shared/types";
// import { map } from "rxjs/operators";
// import { noteToNote, noteToOctave } from "../../../Shared/utils";
//
// const virtualAutomationOutput = new easymidi.Output(virtualMidiOutputDevice, true);
//
// interface IEasyMidiNoteMsg {
//     channel: number;
//     note: number;
//     velocity: number;
// }
//
// export const program$ = getMidiObservable<IMidiProgramMsg>(MidiMsgTypes.program).pipe(
//     map(program => ({
//         ...program,
//         channel: program.channel + 1,
//     })),
// );
// export const select$ = getMidiObservable<IMidiSongMsg>(MidiMsgTypes.select).pipe(
//     map(select => ({
//         ...select,
//         channel: select.channel + 1,
//     })),
// );
// export const clock$ = getMidiObservable<void>(
//     MidiMsgTypes.clock,
// );
//
// export const CC$ = getMidiObservable<IMidiCCMsg>(
//     MidiMsgTypes.cc,
// ).pipe(
//     map(cc => ({
//         ...cc,
//         channel: cc.channel + 1,
//     })),
// );
//
// export function sendMIDIPreset(msg: IPresetMsg) {
//     const midiMsg: IEasyMidiNoteMsg = {
//         channel: automationChannel - 1,
//         note: msg.preset,
//         velocity: msg.modifier,
//     };
//     if (msg.state) {
//         virtualAutomationOutput.send("noteon", midiMsg);
//     } else {
//         virtualAutomationOutput.send("noteoff", midiMsg);
//     }
// }
//
// export function sendMIDICC({ controller, value, channel }: IMidiCCMsg) {
//     virtualAutomationOutput.send("cc", {
//         controller,
//         value,
//         channel: channel - 1,
//     });
// }
