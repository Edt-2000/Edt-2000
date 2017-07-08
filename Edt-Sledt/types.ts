/**
 * Midi Messages from easymidi
 */
export interface midiChannel {
    readonly channel: number
}
export interface midiCCMsg extends midiChannel {
    readonly controller: number,
    readonly value: number,
}
export interface midiNoteMsg extends midiChannel {
    readonly note: number,
    readonly noteNumber: number,
    readonly octave: number,
    readonly velocity: number
}
export interface midiProgramMsg extends midiChannel {
    readonly number: number
}
export interface midiSongMsg extends midiChannel {
    readonly song: number
}

/**
 * Edt Preset MIDI octave number mapping
 */
export enum edtOutputs {
    EdtVidt = 1,
    // EdtLEDt = 2
}

/**
 * Midi Msg types
 */
export enum midiMsgTypes {
    cc = "cc",
    select = "select",
    noteon = "noteon",
    noteoff = "noteoff",
    program = "program"
}

export interface edtOutput {
    presets: edtPresets;
}

export interface edtPreset {
    initPreset(velocity:number): void,
    destroyPreset(): void
}

export interface edtPresets {
    [key:string]: edtPreset
}

// // /TP 2 [start: int] [end: int] [h: int] [s: int] [l: int] [duration: int]