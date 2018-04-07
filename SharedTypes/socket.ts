export interface IColor {
    readonly hue: number;
    readonly saturation: number;
    readonly brightness: number;
}

export enum VidtPresets {
    HackingAnimation = 'HackingAnimation',
    Gridscape = 'Gridscape',
    LogoIdle = 'LogoIdle',
    TextDisplay = 'TextDisplay',
    Shutdown = 'Shutdown',
    VideoPlayer = 'VideoPlayer',
    PhotoBounce = 'Photobounce',
    PhotoGlitcher = 'PhotoGlitcher',
    Bluescreen = 'Bluescreen',
    Vista = 'Vista',
}

// SubMessages

export interface IPreparePresetMsg {
    readonly preset: VidtPresets;
}

export interface IIntensityMsg {
    readonly intensity: number;
}

export interface ICenteredText extends IColor {
    readonly textValue;
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
