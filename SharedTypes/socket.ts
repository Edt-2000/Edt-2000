// -------------------------------- Building blocks

export interface bgColor {
    readonly hue: number,
    readonly saturation: number,
    readonly brightness: number
}

// All types
export type socketMsgTypes = drumCycleMsg;

// -------------------------------- Message types

export interface drumCycleMsg {
    bgColor: bgColor
}
