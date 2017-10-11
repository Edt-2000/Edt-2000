// Device IPs
export const enum DeviceIPs {
    edtOut = '10.0.0.11',
    edtIn = '10.0.0.12',
    edtPad = '10.0.0.100',
}

// OSC Adresses of Edt Family
export enum OSCDevices {
    EdtLed = 'L',
    EdtOnOff = 'O',
}

// Set Modus of Edt-LED
export enum Modii {
    SingleSolid = 0,
    SinglePulse = 1,
    RainbowSolid = 2,
    RainbowPulse = 3,
    VUMeter = 4,
    Twinkle = 5,
    Strobo = 6,
}

export const oscInPort = 12345;
export const oscOutPort = 12345;

// Which channel sends presets?
export const drumChannel: number = 10;
export const adjustmentChannel: number = 15;
export const presetMsgChannel: number = 16;

export const virtualMidiInputDevice: string = 'EDT-SLEDT-IN';
export const virtualMidiOutputDevice: string = 'EDT-SLEDT-OUT';

// // /TP 2 [start: int] [end: int] [h: int] [s: int] [l: int] [duration: int]
