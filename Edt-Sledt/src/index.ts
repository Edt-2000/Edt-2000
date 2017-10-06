'use strict';
import {edtPresets, Preset$} from './presets/presets';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/merge';
import {OSC$, sendToOSC} from './communication/osc';
import {deviceIPs} from '../../SharedTypes/config';
import {DrumNotes, DrumTriggerOff$, DrumTriggerOn$} from './inputs/musicTriggers';
import {timestamp} from 'rxjs/operator/timestamp';

Preset$
    .do((msg) => {
        sendToOSC(deviceIPs.edtpadt, ['Preset', msg.preset.toString()], [Number(msg.state)])
    })
    .subscribe((msg) => {
        if (msg.state) {
            edtPresets.get(msg.preset).startPreset(msg.modifier);
        } else {
            edtPresets.get(msg.preset).stopPreset();
        }
    });

OSC$.subscribe((msg) => {
    console.log('OSC:', msg.addresses, msg.values);
});

// This currently overloads the iPad a little, not very useful
// DrumTriggerOn$.subscribe((note) => {
//     sendToOSC(deviceIPs.edtpadt, ['DrumTrigger', note.toString()], [1]);
// });


edtPresets.get(2).startPreset(DrumNotes._2);
