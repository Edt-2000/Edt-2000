import { Actions, Actions$, nextActionFromMsg } from '../../Shared/actions/actions';
import { presets } from '../config/presets';
import { scannedContentGroups } from './media/asset-scan-dir';
import { presetCues } from '../config/cues/cues';
import { automationActions$, automationCCMessages$ } from './automation';
import { sendToMidiCC, sendToMidiNote } from './outputs/edt-midi';
import { presetMidiMsg$ } from './automation/presets';
import { getPresetState } from './presets/presets-logic';
import { enumToArray } from '../../Shared/utils/utils';
import { AnimationTypes } from '../../Shared/vidt/animation';
import { VidtPresets } from '../../Shared/vidt-presets';
import { launchpadPages$ } from '../config/launchpad';
import { Sizes } from '../../Shared/vidt/sizes';
import { Shapes } from '../../Shared/vidt/shapes';
import { connectedControls$ } from './outputs/edt-control';
import { merge } from 'rxjs';
import { connectedVidt$ } from './outputs/edt-vidt';
import { connectedLaunchpad$ } from './outputs/edt-launchpad';

// Main logic: start or stop presets based on presetChanges
Actions$.presetChange.subscribe(({ modifier, preset, state }) => {
    if (!presets[preset]) {
        return;
    }
    if (state) {
        presets[preset].startPreset(modifier);
    } else {
        presets[preset].stopPreset();
    }
});

// Connect to MIDI output/inputs for automation
automationActions$.subscribe(nextActionFromMsg);
automationCCMessages$.subscribe(sendToMidiCC);
presetMidiMsg$.subscribe(sendToMidiNote);

// Emit initial actions to kick things off
nextActionFromMsg(Actions.presetState(getPresetState()));

// We don't want to hardcode these arrays/sets into the code
nextActionFromMsg(Actions.cueList(presetCues));
nextActionFromMsg(Actions.contentGroups(scannedContentGroups));
if (scannedContentGroups[0]) {
    nextActionFromMsg(Actions.contentGroup(scannedContentGroups[0]));
    nextActionFromMsg(Actions.colorPalette(scannedContentGroups[0].colorPalettes[0]));
}
nextActionFromMsg(Actions.vidtPresets(enumToArray(VidtPresets)));
nextActionFromMsg(Actions.animationTypes(enumToArray(AnimationTypes)));

nextActionFromMsg(Actions.shapes(enumToArray(Shapes)));
nextActionFromMsg(Actions.sizes(enumToArray(Sizes)));

// The launchpad pages are dependent on many changing variables so it's build as an observable
launchpadPages$.subscribe(pages => nextActionFromMsg(Actions.launchpadPages(pages)));

console.log('GO GO GO!');

merge(connectedControls$, connectedVidt$, connectedLaunchpad$).subscribe(connectedDevice => console.log('Connected device: ', connectedDevice));
Actions$.contentGroup.subscribe(contentGroup => console.log('ContentGroup selected:', contentGroup.title));
Actions$.singleColor.subscribe(color => console.log('Color - Single: ', color));
Actions$.multiColor.subscribe(color => console.log('Color - Multi:', color));
Actions$.vidtSingleColor.subscribe(color => console.log('ColorVidt - Single: ', color));
Actions$.multiColor.subscribe(color => console.log('ColorVidt - Multi: ', color));
Actions$.prepareVidt.subscribe(vidtPreset => console.log('Vidt change:', VidtPresets[vidtPreset]));
Actions$.presetState.subscribe(presetState => {
    console.log('Presets active: ', presetState
        .filter(({ state }) => state)
        .map(({
                  title,
                  modifier,
              }) => title + ` (${modifier})`),
    );
});
