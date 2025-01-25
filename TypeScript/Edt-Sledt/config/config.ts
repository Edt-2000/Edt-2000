export const enum DeviceIPs {
    edtFastLed = "10.0.0.21",
    edtMOSCidi = "localhost",
    edtSledt = "localhost",
    edtSpectacle = "10.0.0.99",
    edtBackdrop = "10.0.0.21:80",
    edtFrontleds = "10.0.0.22:80",
    edtPowerBar = "10.0.0.128:80",
}

export const OSCInPort = 12346;
export const OSCDispedtOutPort = 12345;
export const MOSCIDIPort = 12347;

export const automationChannel = 16;

export const vidtPresetAutomationCCNumber = 1;
export const imageAutomationCCNumber = 3;
export const videoAutomationCCNumber = 4;
export const wordAutomationCCNumber = 5;
export const animationTypeCCNumber = 6;

export enum OSCDevices {
    EdtFastLed = "F",
    EdtRGBLed = "R",
    EdtDMX = "D",
    EdtOnOff = "O",
    EdtTrack = "TK",
    EdtAudio = "A",
    EdtPedal = "PD",
    EdtGuitar = "GT",
    EdtDrum = "DR",
    EdtSpectacle = "SP",
}

// Set Modus of Edt-LED
export enum Modii {
    SingleSolid = 0,
    SinglePulse = 1,
    SingleSpark = 7,
    RainbowSolid = 2,
    RainbowPulse = 3,
    RainbowSpark = 8,
    Twinkle = 5,
    Strobo = 6,
    DualSolid = 9,
    DualPulse = 10,
    DualSparkle = 11,
    Chase = 12,
    Bash = 13,
}

export const enum ColorVariations {
    inverse = 1,
    normal = 127,
}
