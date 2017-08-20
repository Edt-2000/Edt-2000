// -------------------------------- Building blocks

export interface bgColor {
    readonly hue: number,
    readonly saturation: number,
    readonly brightness: number
}

export interface color {
    readonly hue: number,
    readonly saturation: number,
    readonly brightness: number
}

export enum VidtPresets {
    LogoIdle = 'LogoIdle',
    TextDisplay = 'TextDisplay'
}

// SubMessages

export interface preparePresetMsg {
    readonly preset: VidtPresets
}

export interface colorMsg {
    readonly bgColor: bgColor,
    readonly color: color
}

export interface intensityMsg {
    readonly intensity: number
}

// -------------------------------- Specific Messages

export interface centeredText extends colorMsg {
    readonly textValue
}
