import {DeviceIPs} from './config';
import { IPreset } from './presets';
import { IPhotoAsset, IVideoAsset } from './assets';

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

export interface IPhotoMsg {
    readonly photo: IPhotoAsset;
}

export interface IVideoMsg {
    readonly video: IVideoAsset;
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
