'use strict';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/merge';
import {edtPresets, preset$} from './presets/presets';

preset$
    .subscribe((msg) => {
        if (msg.state && !edtPresets.get(msg.preset).active) {
            console.log('Starting preset', edtPresets.get(msg.preset).preset);
            edtPresets.get(msg.preset).preset.startPreset(msg.modifier);
        }
        if (!msg.state && edtPresets.get(msg.preset).active) {
            console.log('Stopping preset', edtPresets.get(msg.preset).preset);
            edtPresets.get(msg.preset).preset.stopPreset();
        }
    });

// OSC$.subscribe((msg) => {
//     console.log('OSC:', msg.addresses, msg.values);
// });

// edtPedal$.subscribe((pedal) => {
//     // console.log('Pedal!', pedal.instance, pedal.pedal);
// });

// edtTrack$.subscribe((trackMsg) => {
//     sendToVidt(trackMsg);
// });
