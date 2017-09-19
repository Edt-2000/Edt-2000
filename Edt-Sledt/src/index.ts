'use strict';
import {adjustmentNoteOn, presetNoteOff, presetNoteOn} from './communication/midi';
import {edtPresets} from './presets/presets';
import {DrumTrigger} from './subjects/musicTriggers';

export let listenToNote = 0;
export let listenToChannel = 0;

// Listen to PresetChange note messages
presetNoteOn
    .subscribe((presetMsg) => {
        if(edtPresets.has(presetMsg.note)) {
            console.log(`Preset ON: ${presetMsg.note}.`);
            edtPresets.get(presetMsg.note).startPreset(presetMsg.velocity);
        } else {
            console.log(`Preset ON: ${presetMsg.note} - preset not configured.`);
        }
    });
presetNoteOff
    .subscribe((presetMsg) => {
        if (edtPresets.has(presetMsg.note)) {
            console.log(`Preset ON: ${presetMsg.note}.`);
            edtPresets.get(presetMsg.note).stopPreset();
        }
    });

// Listen to adjustment notes to switch note to listen to with filteredNote
adjustmentNoteOn
    .subscribe((msg) => {
        console.log(`Setting note ${msg.noteNumber} of octave ${msg.octave} (${msg.note}) on channel ${msg.velocity} as responsive note.`);
        listenToNote = msg.note;
        listenToChannel = msg.velocity;
    });

// DrumTrigger.subscribe(console.log);
