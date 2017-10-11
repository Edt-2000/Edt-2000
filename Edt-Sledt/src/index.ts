'use strict';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/merge';
import {DeviceIPs} from '../../SharedTypes/config';
import {OSC$, sendToOSC} from './communication/osc';
import {DrumNotes, drumTriggerOn$} from './inputs/musicTriggers';
import {edtPresets, preset$} from './presets/presets';

preset$
    .do((msg) => {
        sendToOSC(DeviceIPs.edtpadt, ['Preset', msg.preset.toString()], [Number(msg.state)]);
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
drumTriggerOn$.subscribe((note) => {
    sendToOSC(DeviceIPs.edtpadt, ['DrumTrigger', note.toString()], [1]);
});

edtPresets.get(2).startPreset(DrumNotes._2);
