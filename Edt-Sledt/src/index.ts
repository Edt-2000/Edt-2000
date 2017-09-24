'use strict';
import {presetNoteOff, presetNoteOn} from './inputs/midi';
import {edtPresets} from './presets/presets';
import 'rxjs/add/operator/do';
import {DrumTrigger} from './subjects/musicTriggers';
import {sendToOSC} from './communication/osc';
import {Preset1} from './inputs/edt-padt';

// Listen to PresetChange note messages
presetNoteOn
    .do((msg) => console.log(`Activating preset ${msg.note}.`))
    .do((msg) => sendToOSC(`/PRESET/${msg.note}`, [1])) // PRESET ON OSC
    .subscribe((presetMsg) => {
        if (edtPresets.has(presetMsg.note)) edtPresets.get(presetMsg.note).startPreset(presetMsg.velocity);
    });

presetNoteOff
    .do((msg) => sendToOSC(`/PRESET/${msg.note}`, [0])) // PRESET OFF OSC
    .subscribe((presetMsg) => {
        if (edtPresets.has(presetMsg.note)) edtPresets.get(presetMsg.note).stopPreset();
    });

DrumTrigger.subscribe(console.log);

Preset1.subscribe((msg) => {
    console.log('PRESET!');
});
