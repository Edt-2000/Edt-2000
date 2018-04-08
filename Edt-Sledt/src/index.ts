'use strict';
import {filter} from 'rxjs/operators';
import {presetMidi$} from './inputs/midi';
import {presetMap} from './presets/presets-logic';
import {presets} from './presets';
import {ctrlSocketIn$} from './communication/sockets';
import {Note} from '../../SharedTypes/midi';

// Add all presets to the preset map
Object.keys(presets).map((key) => presetMap.set(Note[key], presets[key]));

presetMidi$
    .pipe(
        filter((msg) => presetMap.has(msg.preset)),
    )
    .subscribe((msg) => {
        if (msg.state && !presetMap.get(msg.preset).active) {
            console.log('Starting preset', presetMap.get(msg.preset).title);
            presetMap.get(msg.preset).startPreset(msg.modifier);
        }
        if (!msg.state && presetMap.get(msg.preset).active) {
            console.log('Stopping preset', presetMap.get(msg.preset).title);
            presetMap.get(msg.preset).stopPreset();
        }
    });

ctrlSocketIn$.subscribe(console.log);
