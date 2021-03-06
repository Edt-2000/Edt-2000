import { noteToNote, noteToOctave } from '../utils/utils';
import { IMidiCCMsg, IMidiNoteMsg, IMidiSongMsg } from './types';
import { IOSCMessage } from '../osc/types';

export enum Note {
    'C_2',
    'C$_2',
    'D_2',
    'D$_2',
    'E_2',
    'F_2',
    'F$_2',
    'G_2',
    'G$_2',
    'A_2',
    'A$_2',
    'B_2',
    'C_1',
    'C$_1',
    'D_1',
    'D$_1',
    'E_1',
    'F_1',
    'F$_1',
    'G_1',
    'G$_1',
    'A_1',
    'A$_1',
    'B_1',
    'C0',
    'C$0',
    'D0',
    'D$0',
    'E0',
    'F0',
    'F$0',
    'G0',
    'G$0',
    'A0',
    'A$0',
    'B0',
    'C1',
    'C$1',
    'D1',
    'D$1',
    'E1',
    'F1',
    'F$1',
    'G1',
    'G$1',
    'A1',
    'A$1',
    'B1',
    'C2',
    'C$2',
    'D2',
    'D$2',
    'E2',
    'F2',
    'F$2',
    'G2',
    'G$2',
    'A2',
    'A$2',
    'B2',
    'C3',
    'C$3',
    'D3',
    'D$3',
    'E3',
    'F3',
    'F$3',
    'G3',
    'G$3',
    'A3',
    'A$3',
    'B3',
    'C4',
    'C$4',
    'D4',
    'D$4',
    'E4',
    'F4',
    'F$4',
    'G4',
    'G$4',
    'A4',
    'A$4',
    'B4',
    'C5',
    'C$5',
    'D5',
    'D$5',
    'E5',
    'F5',
    'F$5',
    'G5',
    'G$5',
    'A5',
    'A$5',
    'B5',
    'C6',
    'C$6',
    'D6',
    'D$6',
    'E6',
    'F6',
    'F$6',
    'G6',
    'G$6',
    'A6',
    'A$6',
    'B6',
    'C7',
    'C$7',
    'D7',
    'D$7',
    'E7',
    'F7',
    'F$7',
    'G7',
    'G$7',
    'A7',
    'A$7',
    'B7',
    'C$8',
    'D8',
    'D$8',
    'E8',
    'F8',
    'F$8',
    'G8',
}

export function isMidiMessage(OSCMsg: IOSCMessage): boolean {
    return OSCMsg.addresses.length === 2 &&
        OSCMsg.addresses[0] === 'midi';
}

export function isMidiNoteMessage(OSCMsg: IOSCMessage): boolean {
    return OSCMsg.addresses[1] === 'note';
}

export function isMidiCCMessage(OSCMsg: IOSCMessage): boolean {
    return OSCMsg.addresses[1] === 'cc';
}

export function isMidiSongMessage(OSCMsg: IOSCMessage) {
    return OSCMsg.addresses[1] === 'select';
}

export function convertOSCToMIDINoteMessage(OSCMsg: IOSCMessage, channelOffset = 0): IMidiNoteMsg {
    return {
        note: +OSCMsg.values[1],
        noteOn: +OSCMsg.values[2] !== 0,
        noteNumber: noteToNote(+OSCMsg.values[1]),
        octave: noteToOctave(+OSCMsg.values[1]),
        velocity: +OSCMsg.values[2],
        channel: +OSCMsg.values[0] + channelOffset,
    };
}

export function convertOSCToMIDICCMessage(OSCMsg: IOSCMessage, channelOffset = 0): IMidiCCMsg {
    return {
        channel: +OSCMsg.values[0] + channelOffset,
        controller: +OSCMsg.values[1],
        value: +OSCMsg.values[2],
    };
}

export function convertOSCToMidiSongMessage(OSCMsg: IOSCMessage): IMidiSongMsg {
    return {
        song: +OSCMsg.values[0] + 1,
    };
}
