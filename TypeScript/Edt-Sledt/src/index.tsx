import { filter, scan, startWith, tap } from 'rxjs/operators';
import { Actions, Actions$, nextActionFromMsg } from '../../Shared/actions';
import { getPresetState, presets } from './presets/presets';
import * as React from 'react';
import { render } from 'ink';
import { scannedContentGroups } from './media/asset-scan-dir';
import { presetCues } from './cues/cues';
import { EdtConsole } from './outputs/edt-console';
import { connectedControls$ } from './outputs/edt-control';
import { connectedVidt$ } from './outputs/edt-vidt';
import { combineLatest } from 'rxjs';
import { OSCOutput$ } from './communication/osc';
import { automationActions$, automationCCMessages$, automationNoteMessages$ } from './automation';
import { sendToMidiCC, sendToMidiNote } from './outputs/edt-midi';

const {rerender} = render(<></>);

// Main logic: start or stop presets based on presetChanges
Actions$.presetChange.pipe(
    filter(msg => presets[msg.preset]),
    tap(({modifier, preset, state}) => {
        if (state) {
            presets[preset].startPreset(modifier);
        } else {
            presets[preset].stopPreset();
        }
    }),
).subscribe();

// Display status in a react console
combineLatest(
    [
        connectedVidt$,
        connectedControls$,
        Actions$.presetState,
        Actions$.imageSrc,
        OSCOutput$.pipe(
            startWith(''),
            scan((mostRecent: string[], current) => [...mostRecent, current].slice(-9), []),
        ),
    ],
).pipe(
    tap(([vidts, controls, presetState, imageSrc, OSCOutput]) => {
        rerender(<EdtConsole vidts={vidts} controls={controls} presetState={presetState} OSCOutput={OSCOutput} imageSrc={imageSrc}/>);
    }),
).subscribe();

// Connect to MIDI output/inputs for automation
automationActions$.subscribe(nextActionFromMsg);
automationCCMessages$.subscribe(sendToMidiCC);
automationNoteMessages$.subscribe(sendToMidiNote);

// Emit initial actions to kick things off
nextActionFromMsg(Actions.presetState(getPresetState()));
nextActionFromMsg(Actions.cueList(presetCues));
nextActionFromMsg(Actions.contentGroups(scannedContentGroups));

