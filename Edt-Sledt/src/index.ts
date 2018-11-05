import {filter, tap} from 'rxjs/operators';
import {presetMidi$} from './inputs/midi';
import {merge} from 'rxjs/observable/merge';
import {SocketSetup} from './communication/sockets';
import {Actions, Actions$, nextActionFromMsg} from '../../Shared/actions';
import {MidiAutomationInput} from './inputs/midi-automation';
import {MidiAutomationOutput} from './outputs/midi-automation';
import {EdtVidtSetup} from './outputs/edt-vidt';
import {getPresetState, presets} from "./presets/presets";
import {AssetScanDir} from "./asset-scan-dir";
import {EdtControlSetup} from "./outputs/edt-control";
import {CueListSetup} from "./cues/cues";

merge(
    presetMidi$,
    Actions$.presetChange,
).pipe(
    filter((msg) => presets[msg.preset]),
).subscribe((msg) => {
    if (msg.state) {
        presets[msg.preset].startPreset(msg.modifier);
    } else {
        presets[msg.preset].stopPreset();
    }
});

Actions$.mainDrum.pipe(tap(drum => console.log('drum', drum))).subscribe();

nextActionFromMsg(Actions.presetState(getPresetState()));

console.log('Including modules: ',
    MidiAutomationInput,
    MidiAutomationOutput,
    EdtVidtSetup,
    EdtControlSetup,
    AssetScanDir,
    SocketSetup,
    CueListSetup,
);
console.log('Init complete, waiting for devices and/or messages..');

// Loggers, comment to disable

// presetOn$.subscribe((msg) => console.log('PresetOn', msg));
// noteOn$.subscribe((msg) => console.log('NoteOn', msg));
// noteOff$.subscribe((msg) => console.log('NoteOff', msg));
// program$.subscribe((msg) => console.log('Program', msg));
// select$.subscribe((msg) => console.log('Select', msg));
// CC$.subscribe((msg) => console.log('CC', msg));
