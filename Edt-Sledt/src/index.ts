import {filter} from 'rxjs/operators';
import {presetMidi$} from './inputs/midi';
import {presetMap} from './presets/presets-logic';
import {merge} from 'rxjs/observable/merge';
import {sendStateToControl, toControl} from './outputs/edt-control';
import {io} from './communication/sockets';
import {BeatToColor} from './presets/converters/color/beatToColor';
import {DrumToBeat} from './presets/converters/drums/drumToBeat';
import {BeatToVidtBounce} from './presets/outputs/beatToVidtBounce';
import {MidiToColors} from './presets/converters/color/midiToColors';
import {presetCues} from '../../Shared/cues';
import {midiPreset} from './communication/midi';
import {Actions, Actions$, nextActionFromMsg} from '../../Shared/actions';

// Simply add a preset in this array to activate it!
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

Actions$.presetChange.subscribe(midiPreset);

io.on('connection', (socket) => {
    console.log('Device connected!');
    sendStateToControl();
    toControl(Actions.cueList(presetCues));

    socket.on('disconnect', () => {
        console.log('Device disconnected!');
    });

    socket.on('fromControl', nextActionFromMsg);
});

console.log('Init complete, waiting for devices and/or messages..');

// Loggers, comment to disable

// presetOn$.subscribe((msg) => console.log('PresetOn', msg));
// noteOn$.subscribe((msg) => console.log('NoteOn', msg));
// noteOff$.subscribe((msg) => console.log('NoteOff', msg));
// Program$.subscribe((msg) => console.log('Program', msg));
// Select$.subscribe((msg) => console.log('Select', msg));
// CC$.subscribe((msg) => console.log('CC', msg));
