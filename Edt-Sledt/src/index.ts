'use strict';
import {adjustmentNoteOn, presetNoteOff, presetNoteOn} from './communication/midi';
import {destroyPreset, EdtOutputs, initPreset} from './presets/presets';
import {manualColor} from './manual-controls';
import {EdtColor} from './outputs/shared-subjects';

export let listenToNote = 0;
export let listenToChannel = 0;

// Listen to PresetChange note messages
presetNoteOn
    .filter((msg) => msg.octave in EdtOutputs)
    .subscribe((msg) => {
        initPreset(msg.octave, msg.noteNumber, msg.velocity)
    });

presetNoteOff
    .filter((msg) => msg.octave in EdtOutputs)
    .subscribe((msg) => {
        destroyPreset(msg.octave, msg.noteNumber);
    });

adjustmentNoteOn
    .subscribe((msg) => {
        console.log(`Setting note ${msg.noteNumber} of octave ${msg.octave} (${msg.note}) on channel ${msg.velocity} as responsive note.`);
        listenToNote = msg.note;
        listenToChannel = msg.velocity;
    });

// Pass manual colors to EdtColor
manualColor
    .subscribe((msg) => {
        EdtColor.next(msg);
    });
