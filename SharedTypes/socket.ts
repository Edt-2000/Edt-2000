// -------------------------------- Building blocks

export interface bgColor {
    readonly hue: number,
    readonly saturation: number,
    readonly brightness: number
}

// All types

export enum socketMsgType {
    drumCycleMsg
}

export type socketMsgTypes = drumCycleMsg;

// -------------------------------- Message types

export interface drumCycleMsg {
    type: socketMsgType,
    bgColor: bgColor
}
