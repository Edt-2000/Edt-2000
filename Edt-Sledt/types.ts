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
    readonly velocity: number
}
export interface midiProgramMsg extends midiChannel {
    readonly number: number
}
export interface midiSongMsg extends midiChannel {
    readonly song: number
}

/**
 * Edt Preset MIDI CC number mapping
 */
export enum edtOutputs {
    EdtVidt = 20,
    EdtTOP = 21
}

export enum midiMsgTypes {
    cc,
    select,
    noteon,
    noteoff,
    program
}

export interface edtOutputImplementation {
    edtOutputId: edtOutputs,
    activePreset: number,
    register(preset: number): void,
    destroy(): void
}

// // /TP 2 [start: int] [end: int] [h: int] [s: int] [l: int] [duration: int]