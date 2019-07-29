import { Actions } from '../actions';

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
    readonly title: string;
    readonly config: IModifierOptions;
}

export interface GroupedControlPresetMsg {
    title: string;
    presets: IControlPresetMsg[];
}

export interface ICue {
    label: string;
    actions: Actions[];
}

export enum ModifierGroup {
    Drums,
    Color,
    Vidt,
    Words,
    RGBLED,
    FastLED,
    Melody,
    Beat,
    Midi,
}

export interface IModifierOptions {
    readonly select?: IModifierSelectOption[];
    readonly continuous?: {
        readonly min: number;
        readonly max: number;
        readonly step: number;
    };
    readonly group: ModifierGroup[];
}

export interface IModifierSelectOption {
    label: string;
    value: number;
}

export interface ITrack {
    left: {
        x: number;
        y: number;
        z: number;
    };
    right: {
        x: number;
        y: number;
        z: number;
    };
}

export interface IColor {
    readonly h: number;
    readonly s: number;
    readonly b: number;
}

export interface AssetSet {
    name: string;
    assets: string[];
}

export interface IOSCMessage {
    addresses: string[];
    values: number[];
}

export interface ContentGroup {
    title: string;
    wordSet: string[];
    images: string[];
    videos: string[];
}
