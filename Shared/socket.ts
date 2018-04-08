import {DeviceIPs} from './config';
import { IPreset } from './presets';

export const socketPort: number = 8988;

export const socketConfig: {url: string, options: object} = {
    url: `${DeviceIPs.edtSledt}:${socketPort}`,
    options: {},
};

// -------------------------------- Building blocks

export interface IColor {
    readonly hue: number;
    readonly saturation: number;
    readonly brightness: number;
}

// SubMessages

export interface IPresetMsg {
    readonly preset: IPreset;
}

export interface IIntensityMsg {
    readonly intensity: number;
}

export interface IBeatMsg {
    readonly beat: boolean;
}

export interface ITextMsg {
    readonly text: string;
}

export interface IVideoSrcMsg {
    readonly video: number;
    readonly glitchEffect: boolean;
    readonly lineEffect: boolean;
}

// -------------------------------- Specific Messages

export interface ICenteredText extends IColor {
    readonly textValue: string;
}

export interface ITrackMsg {
    left: {
        x: number,
        y: number,
        z: number,
    };
    right: {
        x: number,
        y: number,
        z: number,
    };
}
