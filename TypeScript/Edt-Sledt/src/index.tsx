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
import { enumToArray } from '../../Shared/utils/utils';
import { AnimationTypes } from '../../Shared/vidt/animation';
import { VidtPresets } from '../../Shared/vidt-presets';
import { launchpadConfig } from '../config/launchpad';

// https://github.com/vadimdemedes/ink
render(<EdtConsole/>);

// Main logic: start or stop presets based on presetChanges
Actions$.presetChange
    .pipe(
        filter(msg => !!presets[msg.preset]),
        tap(({ modifier, preset, state }) => {
            if (state) {
                presets[preset].startPreset(modifier);
            } else {
                presets[preset].stopPreset();
            }
        }),
    )
    .subscribe();

// Connect to MIDI output/inputs for automation
automationActions$.subscribe(nextActionFromMsg);
automationCCMessages$.subscribe(sendToMidiCC);
presetMidiMsg$.subscribe(sendToMidiNote);

// Emit initial actions to kick things off
nextActionFromMsg(Actions.presetState(getPresetState()));

// Send presets cues
nextActionFromMsg(Actions.cueList(presetCues));
// The Edt-Sledt server scans the media directory and exposes this to all apps
nextActionFromMsg(Actions.contentGroups(scannedContentGroups));
// The launchpad is build dynamically; we always select first page by default
nextActionFromMsg(Actions.launchpadPages(launchpadConfig));
nextActionFromMsg(Actions.launchpadPage(launchpadConfig[0]));
// We send the presets and animationTypes so we don't have to hardcode them
nextActionFromMsg(Actions.vidtPresets(enumToArray(VidtPresets)));
nextActionFromMsg(Actions.animationTypes(enumToArray(AnimationTypes)));
