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
    readonly noteNumber: number;
    readonly octave: number;
    readonly velocity: number;
}

export interface IMidiProgramMsg extends IMidiChannel {
    readonly number: number;
}

export interface IMidiSongMsg extends IMidiChannel {
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

export interface IPresetMsg {
    readonly preset: number;
    readonly modifier: number;
    readonly state: boolean;
}

export interface IControlPresetMsg extends IPresetMsg {
    readonly title: string,
    readonly config: IModifierOptions,
}

export interface IPresetCue {
    title: string;
    description: string;
    presets: IPresetMsg[];
}

export interface IModifierOptions {
    readonly type: 'none' | 'select' | 'continuous';
    readonly select?: IModifierSelectOption[],
    readonly continuous?: {
        readonly min: number;
        readonly max: number;
        readonly step: number;
    }
}

export interface IModifierSelectOption {
    label: string,
    value: number,
}
