import { Actions } from './actions';

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

export interface LaunchpadPage {
    title: string;
    triggers: LaunchpadTrigger[][];
}

export enum TriggerType {
    text,
    color,
    image,
}

export enum LaunchpadColor {
    red = 'red',
    green = 'green',
    amber = 'amber',
    yellow = 'yellow',
    off = 'off',
}

export interface LaunchpadTrigger {
    color: LaunchpadColor; // Button Default
    title: string; // Title
    triggerType: TriggerType;
    triggerAction: Actions; // TriggerAction
    releaseAction?: Actions; // TriggerAction on release
}

export enum ModifierGroup {
    EdtDrums,
    EdtGuitar,
    Drums,
    Color,
    Vidt,
    Words,
    RGBLED,
    FastLED,
    Melody,
    Beat,
    Midi,
    Bass,
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

export interface ContentGroup {
    songNr: number;
    title: string;
    wordSet: string[];
    images: string[];
    videos: string[];
}
