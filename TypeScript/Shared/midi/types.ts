import { Note } from './midi';

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

// The drum notes are configurable from label to note played (match your machine)
// 'LABEL' = Note.<<PlayedNote>>
export enum DrumNotes {
    '_1' = Note.C1,
    '_2' = Note.D1,
    '_3' = Note.E1,
    '_4' = Note.F1,
    '_5' = Note.G1,
    '_6A' = Note.F$1,
    '_6B' = Note.A$1,
    '_7A' = Note.C$2,
    '_7B' = Note.D$2,
}

export enum DrumSounds {
    ____EMPTY____,
    kick,
    mainSnare,
    secondSnare,
    hihatClosed,
    hihatOpen,
    floor,
    tom1,
    tom2,
    bell,
    crash,
    clap,
    cow,
    shaker,
    agogo,
}
