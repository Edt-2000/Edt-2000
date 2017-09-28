'use strict';
import {presetMidi} from './inputs/midi';
import {edtPresets} from './presets/presets';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/merge';
import {sendToOSC} from './communication/osc';
import {ManualPresets} from './inputs/edt-padt';
import {deviceIPs, presetMsgChannel} from '../../SharedTypes/config';
import {virtualOutput} from './communication/midi';

// Listen to PresetChange note messages or manual presets
ManualPresets
    .do((msg) => { // If manual, send out midi notes so we can record
            if (msg.state) {
                virtualOutput.send('noteon', {
                    note: msg.preset,
                    velocity: 127,
                    channel: presetMsgChannel - 1
                });
            } else {
                virtualOutput.send('noteoff', {
                    note: msg.preset,
                    velocity: 0,
                    channel: presetMsgChannel - 1
                });
            }
        })
    .merge(presetMidi) // Also listen to midi preset changes
    .filter((msg) => edtPresets.has(msg.preset)) // Only filter the ones we have registered
    .do((msg) => console.log(`Setting preset ${msg.preset} ${msg.state ? 'on' : 'off'}.`))
    .do((msg) => sendToOSC(deviceIPs.edtpadt, `/Preset/${msg.preset}`, [Number(msg.state)])) // PRESET TO OSC
    .subscribe((msg) => {
        if (msg.state) {
            edtPresets.get(msg.preset).startPreset(msg.modifier);
        } else {
            edtPresets.get(msg.preset).stopPreset();
        }
    });

