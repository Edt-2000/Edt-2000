export const socketConfig: {url: string, options: object} = {
    url: '10.0.0.200:8988',
    options: {},
};

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
    Shutdown = 'Shutdown',
    VideoPlayer = 'VideoPlayer',
    Bluescreen = 'Bluescreen',
    Vista = 'Vista',
}

// SubMessages

export interface IPreparePresetMsg {
    readonly preset: VidtPresets;
}

export interface IChangeVideoSrcMsg {
    readonly video: number;
    readonly glitchEffect: boolean;
    readonly lineEffect: boolean;
}

export interface IIntensityMsg {
    readonly intensity: number;
}

// -------------------------------- Specific Messages

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
