'use strict';
import {adjustmentNoteOn, presetNoteOff, presetNoteOn} from './communication/midi';
import {edtPresets} from './presets/presets';

export let listenToNote = 0;
export let listenToChannel = 0;

// Listen to PresetChange note messages
presetNoteOn
    .subscribe((msg) => {
        if (edtPresets.has(msg.note)) edtPresets.get(msg.note).startPreset(msg.velocity);
    });
presetNoteOff
    .subscribe((msg) => {
        if (edtPresets.has(msg.note)) edtPresets.get(msg.note).stopPreset();
    });

// Listen to adjustment notes to switch note to listen to with filteredNote
adjustmentNoteOn
    .subscribe((msg) => {
        console.log(`Setting note ${msg.noteNumber} of octave ${msg.octave} (${msg.note}) on channel ${msg.velocity} as responsive note.`);
        listenToNote = msg.note;
        listenToChannel = msg.velocity;
    });
