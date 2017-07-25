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

export enum vidtPresets {
    LogoIdle = 'LogoIdle',
    TextDisplay = 'TextDisplay'
}

// SubMessages

export interface preparePresetMsg {
    readonly preset: vidtPresets
}

export interface colorMsg {
    readonly bgColor: bgColor,
    readonly color: color
}

// -------------------------------- Specific Messages

export interface centeredText extends colorMsg {
    readonly textValue
}
