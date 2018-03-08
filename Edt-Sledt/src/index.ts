'use strict';
import {edtPresets} from './presets/presets';
import {filter} from 'rxjs/operators';
import {presetMidi$} from './inputs/midi';

presetMidi$
    .pipe(
        filter((msg) => edtPresets.has(msg.preset)),
    )
    .subscribe((msg) => {
        if (msg.state && !edtPresets.get(msg.preset).active) {
            console.log('Starting preset', edtPresets.get(msg.preset));
            edtPresets.get(msg.preset).preset.startPreset(msg.modifier);
            edtPresets.get(msg.preset).active = true;
        }
        if (!msg.state && edtPresets.get(msg.preset).active) {
            console.log('Stopping preset', edtPresets.get(msg.preset));
            edtPresets.get(msg.preset).preset.stopPreset();
            edtPresets.get(msg.preset).active = false;
        }
    });
