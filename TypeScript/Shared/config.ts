import { IColor } from "./types";
import { Note } from "./midi";
import { Colors } from "./colors";

export const socketPort: number = 8988;

export const enum DeviceIPs {
    edtIn = "10.0.0.12",
    edtPad = "10.0.0.100",
    edtRemoteDMX = "10.0.0.30",
    edtDispEdter = "localhost",
    edtSledt = "192.168.2.121",
}

export const controlSocketConfig = {
    url: `http://${DeviceIPs.edtSledt}:${socketPort}/control`,
    options: {
        transports: ["websocket"],
    },
};

export const vidtSocketConfig = {
    url: `http://${DeviceIPs.edtSledt}:${socketPort}/vidt`,
    options: {
        transports: ["websocket"],
    },
};

export enum OSCDevices {
    EdtFastLed = "F",
    EdtRGBLed = "R",
    EdtDMX = "D",
    EdtOnOff = "O",
    EdtTrack = "TK",
    EdtAudio = "A",
    EdtPedal = "PD",
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
    h: Colors.Red,
    s: 255,
    b: 255,
};

export const oscOutPort = 12346;
export const oscInPort = 12345;

export const automationChannel = 16;

export const fastLedAmount: number = 7;

export const virtualMidiOutputDevice = "EDT-SLEDT-OUT";

// The channel_10 notes are mapped by the KORG to the following note numbers
export enum DrumNotes {
    "_1" = Note.C1,
    "_2" = Note.D1,
    "_3" = Note.E1,
    "_4" = Note.F1,
    "_5" = Note.G1,
    "_6A" = Note.F$1,
    "_6B" = Note.A$1,
    "_7A" = Note.C$2,
    "_7B" = Note.D$2,
}
