'use strict';
import {adjustmentNoteOn, presetNoteOff, presetNoteOn} from './communication/midi';
import {destroyPreset, EdtOutputs, initPreset} from './presets/presets';
import {manualColor} from './manual-controls';
import {EdtColor} from './outputs/shared-subjects';
import {OSCInput} from './communication/osc';
import {rescale} from './utils';

export let listenToNote = 0;
export let listenToChannel = 0;

// Listen to PresetChange note messages
presetNoteOn
    .filter((msg) => msg.octave in EdtOutputs)
    .subscribe((msg) => {
        initPreset(msg.octave, msg.noteNumber, msg.velocity)
    });

presetNoteOff
    .filter((msg) => msg.octave in EdtOutputs)
    .subscribe((msg) => {
        destroyPreset(msg.octave, msg.noteNumber);
    });

adjustmentNoteOn
    .subscribe((msg) => {
        console.log(`Setting note ${msg.noteNumber} of octave ${msg.octave} (${msg.note}) on channel ${msg.velocity} as responsive note.`);
        listenToNote = msg.note;
        listenToChannel = msg.velocity;
    });

initPreset(EdtOutputs.colors, 1, 127);
initPreset(EdtOutputs.colors, 10, 127);
initPreset(EdtOutputs.colors, 11, 127);
initPreset(EdtOutputs.colors, 12, 127);


// manualColor.subscribe((msg) => {
//     try {
//         EdtColor.next(msg);
//     } catch(e) {
//         console.log('eeee', e);
//     }
// });

//
// OSCInput.subscribe((msg) => {
//     EdtColor.next({
//         color: {
//             hue: 0,
//             saturation: 100,
//             brightness: 50
//         },
//         bgColor: {
//             hue: rescale(msg.values[0], 127, 255, 0),
//             saturation: rescale(msg.values[1], 127, 0, 255),
//             brightness: 50
//         }
//     });
//
// });
