import {DeviceIPs} from './config';
import { animationTypes, IPreset } from './vidt-presets';
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

export interface IAnimationMsg {
    readonly animation: animationTypes;
}

export interface IBeatMsg {
    readonly beat: boolean;
}

export interface IIntensityMsg {
    readonly intensity: number;
}

export interface IPhotoMsg {
    readonly photo: IPhotoAsset;
}

export interface ITextMsg {
    readonly text: string;
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
