"use strict";
import {edtOutputs} from "./types";
import {NoteOff, NoteOn, presetMsgChannel} from './modules/midi';
import {destroyPreset, initPreset} from "./modules/presets";

// Listen to PresetChange note messages
NoteOn.subscribe((msg) => {
    if (msg.channel === presetMsgChannel && msg.octave in edtOutputs) {
        initPreset(msg.octave, msg.noteNumber, msg.velocity);
    }
});

NoteOff.subscribe((msg) => {
    if (msg.channel === presetMsgChannel && msg.octave in edtOutputs) {
        destroyPreset(msg.octave, msg.noteNumber);
    }
});
