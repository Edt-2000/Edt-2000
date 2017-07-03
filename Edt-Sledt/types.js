"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Edt Preset MIDI CC number mapping
 */
var edtOutputs;
(function (edtOutputs) {
    edtOutputs[edtOutputs["EdtVidt"] = 20] = "EdtVidt";
    edtOutputs[edtOutputs["EdtTOP"] = 21] = "EdtTOP";
})(edtOutputs = exports.edtOutputs || (exports.edtOutputs = {}));
var midiMsgTypes;
(function (midiMsgTypes) {
    midiMsgTypes[midiMsgTypes["control"] = 0] = "control";
    midiMsgTypes[midiMsgTypes["select"] = 1] = "select";
    midiMsgTypes[midiMsgTypes["noteon"] = 2] = "noteon";
    midiMsgTypes[midiMsgTypes["noteoff"] = 3] = "noteoff";
    midiMsgTypes[midiMsgTypes["program"] = 4] = "program";
})(midiMsgTypes = exports.midiMsgTypes || (exports.midiMsgTypes = {}));
