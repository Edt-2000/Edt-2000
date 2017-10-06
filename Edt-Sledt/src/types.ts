/**
 * Midi Messages from easymidi
 */
export interface midiChannel {
    readonly channel: number
}

/**
 * Midi Control message
 */
export interface midiCCMsg extends midiChannel {
    readonly controller: number,
    readonly value: number,
}

/**
 * Midi note message
 */
export interface midiNoteMsg extends midiChannel {
    readonly noteOn: boolean,
    readonly note: number,
    readonly noteNumber: number,
    readonly octave: number,
    readonly velocity: number
}

/**
 * Midi program message
 */
export interface midiProgramMsg extends midiChannel {
    readonly number: number
}

/**
 * Midi song message
 */
export interface midiSongMsg extends midiChannel {
    readonly song: number
}

/**
 * Midi Msg types
 */
export enum MidiMsgTypes {
    cc = "cc",
    select = "select",
    noteon = "noteon",
    noteoff = "noteoff",
    program = "program"
}

export type PresetMsg = {
    preset: number,
    modifier: number,
    state: boolean
};
