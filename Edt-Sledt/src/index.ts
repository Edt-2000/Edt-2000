import {filter} from 'rxjs/operators';
import {presetMidi$} from './inputs/midi';
import {presetMap} from './presets/presets-logic';
import {presets} from './presets';
import {Note} from '../../Shared/midi';
import {PresetOnAction} from '../../Shared/actions';
import {ctrlSocketOut$} from './communication/sockets';

// Add all presets to the preset map
Object.keys(presets).map((key) => presetMap.set(Note[key], presets[key]));

presetMidi$
    .pipe(
        filter((msg) => presetMap.has(Note[msg.preset])),
    )
    .subscribe((msg) => {
        if (msg.state && !presetMap.get(Note[msg.preset]).active) {
            console.log('Starting preset', presetMap.get(Note[msg.preset]).title);
            presetMap.get(Note[msg.preset]).startPreset(msg.modifier);
            ctrlSocketOut$.next(new PresetOnAction({
                preset: presetMap.,

            });
        }
        if (!msg.state && presetMap.get(Note[msg.preset]).active) {
            console.log('Stopping preset', presetMap.get(Note[msg.preset]).title);
            presetMap.get(Note[msg.preset]).stopPreset();
        }
    });

