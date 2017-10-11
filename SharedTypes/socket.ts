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
<<<<<<< HEAD
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
=======
>>>>>>> 64bd0bb6783412094b22be153db1381408e3ef97
}
