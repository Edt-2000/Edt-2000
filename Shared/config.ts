import {IColor} from "./socket";
import {Note} from "./midi";

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
    edtDispEdter = '192.168.2.51',
    edtcUDosPBUS = '192.168.2.51',
    edtSledt = '192.168.2.124',
}

export enum OSCDevices {
    EdtFastLed = 'F',
    EdtRGBLed = 'R',
    EdtDMX = 'D',
    EdtOnOff = 'O',
    EdtTrack = 'TK',
    EdtAudio = 'A',
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

export const oscOutPort = 12346;
export const oscInPort = 12345;

export const automationChannel = 16;

export const fastLedAmount: number = 7;

export const virtualMidiInputDevice = 'EDT-SLEDT-IN';
export const hardwareMidiInput = 'EDTMID USB MIDI Interface';
export const virtualMidiOutputDevice = 'EDT-SLEDT-OUT';

// The channel_10 notes are mapped by the KORG to the following note numbers
export enum DrumNotes {
    '_1' = Note.C1,
    '_2' = Note.D1,
    '_3' = Note.E1,
    '_4' = Note.F1,
    '_5' = Note.G1,
    '_6A' = Note.F$1,
    '_6B' = Note.A$1,
    '_7A' = Note.C$2,
    '_7B' = Note.D$2,
}

export const strobeSpeeds = [
    {
        label: 'slow',
        value: 10,
    },
    {
        label: 'medium',
        value: 25,
    },
    {
        label: 'fast',
        value: 40,
    },
    {
        label: 'faster',
        value: 55,
    },
];
