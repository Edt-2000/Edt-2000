import {filter} from 'rxjs/operators';
import {presetMidi$} from './inputs/midi';
import {presetMap} from './presets/presets-logic';
import {merge} from 'rxjs/observable/merge';
import {sendStateToControl, toControl} from './outputs/edt-control';
import {io} from './communication/sockets';
import {Actions, Actions$, nextActionFromMsg} from '../../Shared/actions';
import {presets} from './presets/presets';
import {MidiAutomationInput} from './inputs/midi-automation';
import {MidiAutomationOutput} from './outputs/midi-automation';
import {presetCues} from '../../Shared/cues';
import {EdtVidtOutput} from './outputs/edt-vidt';
import {EdtSerialModule} from './communication/serial';

presets.forEach((preset) => presetMap.set(+preset.note, preset));
if (presets.length !== presetMap.size) console.error('Not all presets have a unique NoteNr!');

merge(
    presetMidi$,
    Actions$.presetChange,
).pipe(
    filter((msg) => presetMap.has(msg.preset)),
).subscribe((msg) => {
    const preset = presetMap.get(msg.preset);
    if (msg.state) {
        preset.startPreset(msg.modifier);
    } else {
        preset.stopPreset();
    }
});

io.on('connection', (socket) => {
    console.log('Device connected!');
    sendStateToControl();
    toControl(Actions.cueList(presetCues));

    socket.on('disconnect', () => {
        console.log('Device disconnected!');
    });

    socket.on('fromControl', nextActionFromMsg);
});

console.log('Including modules: ', MidiAutomationInput, MidiAutomationOutput, EdtVidtOutput, EdtSerialModule);
console.log('Init complete, waiting for devices and/or messages..');

// Loggers, comment to disable

// presetOn$.subscribe((msg) => console.log('PresetOn', msg));
// noteOn$.subscribe((msg) => console.log('NoteOn', msg));
// noteOff$.subscribe((msg) => console.log('NoteOff', msg));
// Program$.subscribe((msg) => console.log('Program', msg));
// Select$.subscribe((msg) => console.log('Select', msg));
// CC$.subscribe((msg) => console.log('CC', msg));
