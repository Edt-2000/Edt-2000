import {IColor} from "./socket";

export const socketPort: number = 8988;

export const socketConfig = {
    url: `http://${DeviceIPs.edtSledt}:${socketPort}`,
    options: {
        transports: ['websocket'],
    },
};

export const enum DeviceIPs {
    edtOut = '10.0.0.11',
    edtIn = '10.0.0.12',
    edtPad = '10.0.0.100',
    edtRemoteDMX = '10.0.0.30',
    edtDispEdter = '169.168.219.93',
    edtcUDosPBUS = '192.168.2.42',
    edtSledt = 'localhost',
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
    Bash = 13,
}

// TODO: each song has a different channel setup, needs to be dynamic!
export enum MidiChannels {
    channel_1 = 1,
    channel_2 = 2,
    channel_3 = 3,
    channel_4 = 4,
    channel_5 = 5,
    channel_10 = 10,
}

// Black is useful to turn off lights and screens
export const BlackColor: IColor = {
    h: 0,
    s: 0,
    b: 0,
};

export enum ColorPreset {
    Red = 0,
    Orange = 18,
    Yellow = 58,
    Lime = 85,
    Green = 95,
    SeaGreen = 105,
    Turquoise = 129,
    Blue = 158,
    Purple = 183,
    Pink = 218,
}

export const colorSet: number[] = [
    ColorPreset.Red,
    ColorPreset.Red,
    ColorPreset.Orange,
    ColorPreset.Yellow,
    ColorPreset.Lime,
    ColorPreset.Green,
    ColorPreset.SeaGreen,
    ColorPreset.Turquoise,
    ColorPreset.Blue,
    ColorPreset.Purple,
    ColorPreset.Pink,
];

// Use npm run serialports to discover connected Arduino's
export const arduinos = [
    '/dev/tty.usbmodem1432341',
    '/dev/tty.usbmodem1432311',
    '/dev/tty.usbmodem1432331',
];

export const oscOutPort = 12345;
export const oscInPort = 12345;

export const automationChannel = 16;

export const fastLedAmount: number = 7;

export const virtualMidiInputDevice = 'EDT-SLEDT-IN';
export const hardwareMidiInput = 'EDTMID USB MIDI Interface';
export const virtualMidiOutputDevice = 'EDT-SLEDT-OUT';

// The channel_10 notes are mapped by the KORG to the following note numbers
export enum DrumNotes {
    '_1' = 36,
    '_2' = 38,
    '_3' = 40,
    '_4' = 41,
    '_5' = 43,
    '_6A' = 42,
    '_6B' = 46,
    '_7A' = 49,
    '_7B' = 51,
}

export const strobeSpeeds = [
    {
        label: 'slow',
        value: 10,
    },
    {
        label: 'medium',
        value: 50,
    },
    {
        label: 'fast',
        value: 100,
    },
    {
        label: 'faster',
        value: 150,
    },
    {
        label: 'whoa',
        value: 200,
    },
    {
        label: 'drool',
        value: 255,
    },
]
