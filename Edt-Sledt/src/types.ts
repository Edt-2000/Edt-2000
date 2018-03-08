/**
 * Midi Messages from easymidi
 */
import {Note} from './inputs/midi';

export interface IMidiChannel {
    readonly channel: number;
}

/**
 * Midi Control message
 */
export interface IMidiCCMsg extends IMidiChannel {
    readonly controller: number;
    readonly value: number;
}

/**
 * Midi note message
 */
export interface IMidiNoteMsg extends IMidiChannel {
    readonly noteOn: boolean;
    readonly note: number;
    readonly noteNumber: number;
    readonly octave: number;
    readonly velocity: number;
}

/**
 * Midi program message
 */
export interface IMidiProgramMsg extends IMidiChannel {
    readonly number: number;
}

/**
 * Midi song message
 */
export interface IMidiSongMsg extends IMidiChannel {
    readonly song: number;
}

/**
 * Midi Msg types
 */
export enum MidiMsgTypes {
    cc = 'cc',
    select = 'select',
    noteon = 'noteon',
    noteoff = 'noteoff',
    program = 'program',
    clock = 'clock',
}

export interface IPresetMsg {
    preset: number;
    modifier: number;
    state: boolean;
}
