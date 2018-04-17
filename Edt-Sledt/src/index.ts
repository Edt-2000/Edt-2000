import {filter} from 'rxjs/operators';
import {presetMidi$} from './inputs/midi';
import {presetMap} from './presets/presets-logic';
import {merge} from 'rxjs/observable/merge';
import {presetCtrlChange$} from './inputs/edt-control';
import {Actions} from '../../Shared/actions';
import {ctrlSocketIn$, ctrlSocketOut$, sendStateToControl} from './outputs/edt-control';
import {io} from './communication/sockets';
import {BeatToColor} from './presets/converters/color/beatToColor';
import {DrumToBeat} from './presets/converters/drums/drumToBeat';
import {BeatToVidtBounce} from './presets/outputs/beatToVidtBounce';
import {MidiToColors} from './presets/converters/color/midiToColors';
import {presetCues} from '../../Shared/cues';
import {midiOutput$} from './communication/midi';

// Init all presets and add to presetMap
const presets = [
    new BeatToColor(),
    new MidiToColors(),
    new DrumToBeat(),
    new BeatToVidtBounce(),
];
presets.forEach((preset) => presetMap.set(+preset.note, preset));
if (presets.length !== presetMap.size) console.error('Not all presets have a unique NoteNr!');

merge(
    presetMidi$,
    presetCtrlChange$,
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

presetCtrlChange$.subscribe(presetChange => midiOutput$.next(presetChange));

io.on('connection', (socket) => {
    console.log('Controller connected!');
    sendStateToControl();
    ctrlSocketOut$.next(Actions.cueList(presetCues));

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
