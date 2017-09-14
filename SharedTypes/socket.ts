// -------------------------------- Building blocks

export interface color {
    readonly hue: number,
    readonly saturation: number,
    readonly brightness: number
}

export enum VidtPresets {
    HackingAnimation = 'HackingAnimation',
    LogoIdle = 'LogoIdle',
    TextDisplay = 'TextDisplay',
    TvShutdown = 'TvShutdown',
    HackerTv = 'HackerTv',
    Bluescreen = 'Bluescreen',
    Vista = 'Vista'
}

// SubMessages

export interface preparePresetMsg {
    readonly preset: VidtPresets
}

export interface changeVideoSrcMsg {
    readonly video: number,
    readonly glitchEffect: boolean,
    readonly lineEffect: boolean
}

export interface colorMsg {
    readonly bgColor: color,
    readonly color: color
}

export interface intensityMsg {
    readonly intensity: number
}

// -------------------------------- Specific Messages

export interface centeredText extends colorMsg {
    readonly textValue
}
