import { sendToOSC } from "../communication/osc";
import { DeviceIPs, MOSCIDIPort } from "../../config/config";
import { IMidiCCMsg, IMidiNoteMsg } from "../../../Shared/midi/types";

export function sendToMidiNote(midiNoteMsg: IMidiNoteMsg) {
    // Send velocity (modifier) or 0 when noteOff
    sendToOSC(DeviceIPs.edtMOSCidi, MOSCIDIPort, {
        addresses: ["midi", "note"],
        values: [midiNoteMsg.channel, midiNoteMsg.note, midiNoteMsg.velocity],
    });
}

export function sendToMidiCC(midiCCMsg: IMidiCCMsg) {
    sendToOSC(DeviceIPs.edtMOSCidi, MOSCIDIPort, {
        addresses: ["midi", "cc"],
        values: [midiCCMsg.channel, midiCCMsg.controller, midiCCMsg.value],
    });
}
