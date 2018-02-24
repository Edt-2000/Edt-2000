'use strict';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/merge';
import {edtPresets, preset$} from './presets/presets';

preset$
    .subscribe((msg) => {
        if (msg.state) {
            edtPresets.get(msg.preset).startPreset(msg.modifier);
        } else {
            edtPresets.get(msg.preset).stopPreset();
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
