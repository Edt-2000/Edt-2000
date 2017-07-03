/**
 * Midi CC Messages from easymidi
 */
export interface midiCCMsg {
    readonly controller: number,
    readonly value: number,
    readonly channel: number
}

/**
 * Edt Preset MIDI CC number mapping
 */
export enum edtOutputs {
    EdtVidt = 20,
    EdtTOP = 21
}

export interface edtOutputHandler {
    initialize(ports: MIDIPort[]): void,
    destroy(): void
}

export interface MIDIPort {
    on(name: string, virtual?: boolean): any
}

export const midiMsgTypes: object[] = [
    {
        event: "cc"
    },
    // "select",
    // "noteon",
    // "noteoff",
    // "program",
    // "pitch",
    // "position",
    // "start",
    // "continue",
    // "stop",
    // "reset"
];