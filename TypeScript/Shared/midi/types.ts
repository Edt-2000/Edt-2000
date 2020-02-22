export interface IMidiChannel {
    readonly channel: number;
}

export interface IMidiCCMsg extends IMidiChannel {
    readonly controller: number;
    readonly value: number;
}

export interface IMidiNoteMsg extends IMidiChannel {
    readonly noteOn: boolean;
    readonly note: number;
    readonly velocity: number;
    readonly noteNumber?: number;
    readonly octave?: number;
}

export interface IMidiProgramMsg extends IMidiChannel {
    readonly number: number;
}

export interface IMidiSongMsg {
    readonly song: number;
}

export enum MidiMsgTypes {
    cc = 'cc',
    select = 'select',
    noteon = 'noteon',
    noteoff = 'noteoff',
    program = 'program',
    clock = 'clock',
}
