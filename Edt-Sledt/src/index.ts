'use strict';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/merge';
import {DeviceIPs} from '../../SharedTypes/config';
import {sendToOSC} from './communication/osc';
import {edtPedal$} from './inputs/edt-pedal';
import {edtTrack$} from './inputs/edt-track';
import {edtPresets, preset$} from './presets/presets';

preset$
    .do((msg) => {
        sendToOSC(DeviceIPs.edtPad, ['Preset', msg.preset.toString()], [Number(msg.state)]);
    })
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

edtPedal$.subscribe((pedal) => {
    console.log('Pedal!', pedal.instance, pedal.pedal);
});

edtTrack$.subscribe((trackMsg) => {
    console.log('Track', trackMsg);

});
