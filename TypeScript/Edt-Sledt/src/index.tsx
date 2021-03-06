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
import { launchpadPages$ } from '../config/launchpad';
import { colorSets } from '../config/colors';
import { Sizes } from '../../Shared/vidt/sizes';
import { Shapes } from '../../Shared/vidt/shapes';

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

// We don't want to hardcode these arrays/sets into the code
nextActionFromMsg(Actions.cueList(presetCues));
nextActionFromMsg(Actions.contentGroups(scannedContentGroups));
nextActionFromMsg(Actions.vidtPresets(enumToArray(VidtPresets)));
nextActionFromMsg(Actions.animationTypes(enumToArray(AnimationTypes)));
nextActionFromMsg(Actions.colorPalette(colorSets[0]));
nextActionFromMsg(Actions.colorPalettes(colorSets));
nextActionFromMsg(Actions.shapes(enumToArray(Shapes)));
nextActionFromMsg(Actions.sizes(enumToArray(Sizes)));

// The launchpad pages are dependent on many changing variables so it's build as an observable
launchpadPages$.subscribe(pages => nextActionFromMsg(Actions.launchpadPages(pages)));
