// -------------------------------- Building blocks

export interface IColor {
    readonly hue: number;
    readonly saturation: number;
    readonly brightness: number;
}

export enum VidtPresets {
    HackingAnimation = 'HackingAnimation',
    LogoIdle = 'LogoIdle',
    TextDisplay = 'TextDisplay',
    TvShutdown = 'TvShutdown',
    VideoPlayer = 'VideoPlayer',
    Bluescreen = 'Bluescreen',
    Vista = 'Vista',
}

// SubMessages

export interface IPreparePresetMsg {
    readonly preset: VidtPresets;
}

export interface IChangeVideoSrcMsg {
    readonly video: number,
    readonly glitchEffect: boolean,
    readonly lineEffect: boolean
}

export interface IIntensityMsg {
    readonly intensity: number
}

// -------------------------------- Specific Messages

export interface centeredText extends IColor {
    readonly textValue
}
