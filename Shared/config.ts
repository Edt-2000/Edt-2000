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
    edtDispEdter = '10.0.0.201',
    edtSledt = '10.0.0.201',
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

export const defaultColor: IColor = {
    h: 231,
    s: 255,
    b: 255,
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

export const hardwareMidiInput = 'EDTMID USB MIDI Interface';
export const virtualMidiInputDevice = 'EDT-SLEDT-IN';
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

// TODO: move to own file
export const modifiers = {
    strobeSpeeds: [
        {label: 'slow', value: 10},
        {label: 'medium', value: 25},
        {label: 'fast', value: 40},
        {label: 'faster', value: 55},
    ],
    fadeSpeeds: [
        {label: 'fast', value: 150},
        {label: 'medium', value: 80},
        {label: 'slow', value: 30}
    ],
    midiChannels: [
        {label: MidiChannels[MidiChannels.channel_1], value: MidiChannels.channel_1},
        {label: MidiChannels[MidiChannels.channel_2], value: MidiChannels.channel_2},
        {label: MidiChannels[MidiChannels.channel_3], value: MidiChannels.channel_3},
        {label: MidiChannels[MidiChannels.channel_4], value: MidiChannels.channel_4},
        {label: MidiChannels[MidiChannels.channel_5], value: MidiChannels.channel_5},
        {label: MidiChannels[MidiChannels.channel_10], value: MidiChannels.channel_10},
    ],
    drumNotes: [
        {label: DrumNotes[DrumNotes._1], value: DrumNotes._1},
        {label: DrumNotes[DrumNotes._2], value: DrumNotes._2},
        {label: DrumNotes[DrumNotes._3], value: DrumNotes._3},
        {label: DrumNotes[DrumNotes._4], value: DrumNotes._4},
        {label: DrumNotes[DrumNotes._5], value: DrumNotes._5},
        {label: DrumNotes[DrumNotes._6A], value: DrumNotes._6A},
        {label: DrumNotes[DrumNotes._6B], value: DrumNotes._6B},
        {label: DrumNotes[DrumNotes._7A], value: DrumNotes._7A},
        {label: DrumNotes[DrumNotes._7B], value: DrumNotes._7B},
    ]
};
