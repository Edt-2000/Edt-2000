import { filter, tap } from 'rxjs/operators';
import { Actions, Actions$, nextActionFromMsg } from '../../Shared/actions/actions';
import { presets } from '../config/presets';
import * as React from 'react';
import { scannedContentGroups } from './media/asset-scan-dir';
import { presetCues } from '../config/cues/cues';
import { EdtConsole } from './console/edt-console';
import { automationActions$, automationCCMessages$ } from './automation';
import { sendToMidiCC, sendToMidiNote } from './outputs/edt-midi';
import { presetMidiMsg$ } from './automation/presets';
import { getPresetState } from './presets/presets-logic';
import { render } from 'ink';

// https://github.com/vadimdemedes/ink
render(<EdtConsole/>);

// Main logic: start or stop presets based on presetChanges
Actions$.presetChange.pipe(
    filter(msg => !!presets[msg.preset]),
    tap(({ modifier, preset, state }) => {
        if (state) {
            presets[preset].startPreset(modifier);
        } else {
            presets[preset].stopPreset();
        }
    }),
).subscribe();

// Connect to MIDI output/inputs for automation
automationActions$.subscribe(nextActionFromMsg);
automationCCMessages$.subscribe(sendToMidiCC);
presetMidiMsg$.pipe(
    filter(msg => msg.fromMidiInput),
).subscribe(sendToMidiNote);

// Emit initial actions to kick things off
nextActionFromMsg(Actions.presetState(getPresetState()));
nextActionFromMsg(Actions.cueList(presetCues));
nextActionFromMsg(Actions.contentGroups(scannedContentGroups));

