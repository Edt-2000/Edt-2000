export interface IColor {
    readonly hue: number;
    readonly saturation: number;
    readonly brightness: number;
}

export enum VidtPresets {
    Hacking = 'Hacking',
    Gridscape = 'Gridscape',
    Logo = 'Logo',
    TextDisplay = 'TextDisplay',
    Shutdown = 'Shutdown',
    VideoPlayer = 'Video-player',
    PhotoBouncer = 'Photo-bouncer',
    PhotoGlitcher = 'Photo-glitcher',
    Bluescreen = 'Bluescreen',
    Vista = 'Vista',
    ScreensaveBouncer = 'Screensave-bouncer'
}

export interface PresetModel {
    name: VidtPresets;
    path: string;
}

// SubMessages

export interface IPreparePresetMsg {
    readonly preset: VidtPresets;
}

export interface IIntensityMsg {
    readonly intensity: number;
}

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