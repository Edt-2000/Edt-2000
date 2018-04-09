import {filter, tap} from 'rxjs/operators';
import {presetMidi$} from './inputs/midi';
import {presetMap} from './presets/presets-logic';
import {presets} from './presets';
import {Note} from '../../Shared/midi';
import {ctrlSocketOut$} from './communication/sockets';
import {merge} from 'rxjs/observable/merge';
import {Actions} from '../../Shared/actions';
import {presetCtrlOff$, presetCtrlOn$} from './inputs/edt-control';

// Add all presets to the preset map
Object.keys(presets).map((key) => presetMap.set(Note[key], presets[key]));

merge(
    presetMidi$,
    presetCtrlOff$,
    presetCtrlOn$,
).pipe(
        filter((msg) => presetMap.has(msg.preset)),
        filter((msg) => presetMap.get(msg.preset).active !== msg.state), // Check if new state is not current state
    )
    .subscribe((msg) => {
        const preset = presetMap.get(msg.preset);
        if (msg.state) {
            console.log('Starting preset', preset.title);
            preset.startPreset(msg.modifier);
            ctrlSocketOut$.next(Actions.presetOn(msg));
        } else {
            console.log('Stopping preset', preset.title);
            presetMap.get(msg.preset).stopPreset();
            ctrlSocketOut$.next(Actions.presetOff(msg));
        }
    });
