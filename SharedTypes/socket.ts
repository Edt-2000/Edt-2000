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