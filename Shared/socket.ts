import { IPhotoAsset, IVideoAsset } from './assets';
import { animationTypes, IPreset } from './vidt-presets';

export interface ISingleColorMsg {
    readonly hues: number[];
    readonly saturation: number;
    readonly value: number;
    readonly duration: number;
}

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

export interface ICenteredText extends ISingleColorMsg {
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
