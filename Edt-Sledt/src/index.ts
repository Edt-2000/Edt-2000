'use strict';
import {presetNoteOff, presetNoteOn} from './inputs/midi';
import {edtPresets} from './presets/presets';
import 'rxjs/add/operator/do';
import {sendToOSC} from './communication/osc';
import {ManualPresets} from './inputs/edt-padt';
import {deviceIPs} from '../../SharedTypes/config';

// Listen to PresetChange note messages
presetNoteOn
    .do((msg) => console.log(`Activating preset ${msg.note}.`))
    .do((msg) => sendToOSC(deviceIPs.edtpadt, `/Preset/${msg.note}`, [1])) // PRESET ON OSC
    .subscribe((presetMsg) => {
        if (edtPresets.has(presetMsg.note)) edtPresets.get(presetMsg.note).startPreset(presetMsg.velocity);
    });

presetNoteOff
    .do((msg) => sendToOSC(deviceIPs.edtpadt, `/Preset/${msg.note}`, [0])) // PRESET OFF OSC
    .subscribe((presetMsg) => {
        if (edtPresets.has(presetMsg.note)) edtPresets.get(presetMsg.note).stopPreset();
    });

ManualPresets.subscribe();

