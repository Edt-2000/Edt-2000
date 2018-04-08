export const socketPort: number = 8988;

export const socketConfig: { url: string, options: object } = {
    url: `http://${DeviceIPs.edtSledt}:${socketPort}`,
    options: {
        transports: ['websocket'],
    },
};

export const enum DeviceIPs {
    edtOut = '10.0.0.11',
    edtIn = '10.0.0.12',
    edtPad = '10.0.0.100',
    edtSledt = '192.168.2.7',
}

// OSC Adresses of Edt Family
export enum OSCDevices {
    EdtLed = 'L',
    EdtOnOff = 'O',
    EdtTrack = 'TK',
    EdtPedal = 'PD',
}

// Set Modus of Edt-LED
export enum Modii {
    SingleSolid = 0,
    SinglePulse = 1,
    SingleSpark = 7,
    RainbowSolid = 2,
    RainbowPulse = 3,
    RainbowSpark = 8,
    VUMeter = 4,
    Twinkle = 5,
    Strobo = 6,
    DualSolid = 9,
    DualPulse = 10,
    DualSparkle = 11,
    Kitt = 12,
}
export const oscInPort = 12345;

export const oscOutPort = 12345;
// Which channel sends presets?
export const drumChannel: number = 10;
export const adjustmentChannel: number = 15;

export const presetMsgChannel: number = 16;
export const virtualMidiInputDevice: string = 'EDT-SLEDT-IN';
export const virtualMidiOutputDevice: string = 'EDT-SLEDT-OUT';
