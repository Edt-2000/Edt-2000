import {filter} from 'rxjs/operators';
import {presetMidi$} from './inputs/midi';
import {presetMap} from './presets/presets-logic';
import {presets} from './presets';
import {merge} from 'rxjs/observable/merge';
import {presetCtrlOff$, presetCtrlOn$} from './inputs/edt-control';
import {Actions} from '../../Shared/actions';
import {ctrlSocketIn$, sendStateToControl} from './outputs/edt-control';
import {io} from './communication/sockets';

Object.keys(presets).forEach((key) => presetMap.set(+key, presets[key]));

merge(
    presetMidi$,
    presetCtrlOff$,
    presetCtrlOn$,
).pipe(
    filter((msg) => presetMap.has(msg.preset)),
)
    .subscribe((msg) => {
        const preset = presetMap.get(msg.preset);
        if (msg.state) {
            preset.startPreset(msg.modifier);
        } else {
            preset.stopPreset();
        }
    });


io.on('connection', (socket) => {
    console.log('Controller connected!');
    sendStateToControl();

    socket.on('disconnect', () => {
        console.log('Controller disconnected!');
    });

    socket.on('fromControl', (action: Actions) => {
        ctrlSocketIn$.next(action);
    });
});

// Loggers, comment to disable

// presetOn$.subscribe((msg) => console.log('PresetOn', msg));
// noteOn$.subscribe((msg) => console.log('NoteOn', msg));
// noteOff$.subscribe((msg) => console.log('NoteOff', msg));
// Program$.subscribe((msg) => console.log('Program', msg));
// Select$.subscribe((msg) => console.log('Select', msg));
// CC$.subscribe((msg) => console.log('CC', msg));
