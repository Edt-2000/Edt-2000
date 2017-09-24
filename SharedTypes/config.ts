export const deviceIPs = {
    tweedt: '10.0.0.11'
};

export enum OSCDevices {
    EdtLed = 'L',
    EdtOnOff = 'O'
}

export const oscInPort = 12345;
export const oscOutPort = 12346;

// Which channel sends presets?
export const drumChannel: number = 10;
export const adjustmentChannel: number = 15;
export const presetMsgChannel: number = 16;

export const virtualMidiDevice: string = 'EDT-SLEDT';

// // /TP 2 [start: int] [end: int] [h: int] [s: int] [l: int] [duration: int]
