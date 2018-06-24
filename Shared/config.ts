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
    edtDispEdter = '169.168.219.93',
    edtSledt = '192.168.2.16',
}

export enum OSCDevices {
    EdtFastLed = 'F',
    EdtRGBLed = 'R',
    EdtDMX = 'D',
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
    Chase = 12,
}

// TODO: each song has a different channel setup, needs to be dynamic!
export enum MidiChannels {
    channel_1 = 1,
    channel_2 = 2,
    channel_3 = 3,
    channel_10 = 10,
}

export const Arduinos: string[] = [
    '/dev/tty.usbmodem14231',
    '/dev/tty.usbmodem14241',
    '/dev/tty.usbmodem14211',
];

export const oscInPort = 12345;
export const oscOutPort = 12345;

export const automationChannel: number = 16;

export const virtualMidiInputDevice: string = 'EDT-SLEDT-IN';
export const virtualMidiOutputDevice: string = 'EDT-SLEDT-OUT';
