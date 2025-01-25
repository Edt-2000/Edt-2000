import { Actions } from './actions';
import { IColor } from '../colors/types';

export interface IPresetMsg {
    readonly preset: number;
    readonly modifier: number;
    readonly state: boolean;
}

export interface IControlPresetMsg extends IPresetMsg {
    readonly title: string;
    readonly config: IModifierOptions;
    readonly mermaid: MermaidConfig[];
}

export interface MermaidConfig {
    subgraph?: string;
    entry: string;
}

export interface GroupedControlPresetMsg {
    title: string;
    presets: IControlPresetMsg[];
}

export interface ICue {
    label: string;
    activateOnStart?: boolean;
    actions: Actions[];
}

export interface LaunchpadPage {
    title: string;
    triggers: LaunchpadTrigger[][];
}

export interface LaunchpadPageIndex {
    [key: string]: number;
}

export interface LaunchpadPageChange {
    launchpad: string;
    page: number;
}

export enum TriggerType {
    palette,
    text,
    color,
    image,
    video,
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
    payload?: any;
    triggerAction?: Actions; // TriggerAction
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
    FX,
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
    colorPalettes: IColor[][];
}
