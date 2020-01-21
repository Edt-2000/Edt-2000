import { Note } from '../../Shared/midi/midi';

export const enum DeviceIPs {
    edtDispEdter = 'localhost',
    edtMOSCidi = 'localhost',
}

export const socketPort = 8988;

export const OSCInPort = 12346;
export const OSCDispedtOutPort = 12345;
export const MOSCIDIPort = 12347;

export const fastLedAmount = 7;

export const automationChannel = 16;

export const vidtPresetAutomationCCNumber = 1;
export const colorPaletteAutomationCCNumber = 2;
export const imageAutomationCCNumber = 3;
export const videoAutomationCCNumber = 4;
export const wordAutomationCCNumber = 5;
export const animationTypeCCNumber = 6;

export enum OSCDevices {
    EdtFastLed = 'F',
    EdtRGBLed = 'R',
    EdtDMX = 'D',
    EdtOnOff = 'O',
    EdtTrack = 'TK',
    EdtAudio = 'A',
    EdtPedal = 'PD',
    EdtGuitar = 'GT',
    EdtDrum = 'DR',
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
