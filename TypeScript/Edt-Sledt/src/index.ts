import {
    Actions,
    Actions$,
    nextActionFromMsg,
} from "../../Shared/actions/actions";
import { presets } from "../config/presets";
import { scannedContentGroups } from "./media/asset-scan-dir";
import { presetCues } from "../config/cues/cues";
import { automationActions$, automationCCMessages$ } from "./automation";
import { sendToMidiCC, sendToMidiNote } from "./io/edt-midi";
import { presetMidiMsg$ } from "./automation/presets";
import { getPresetState, presetChange } from "./presets/presets-logic";
import { launchpadPages$ } from "../config/launchpad";
import { connectedControllers$ } from "./io/edt-controller";
import { combineLatest, merge, withLatestFrom } from "rxjs";
import { connectedVidt$ } from "./io/edt-vidt";
import { connectedLaunchpad$ } from "./io/edt-launchpad";
import { connectedThomas$ } from "./io/edt-homas";
import { ColorToVidtColor } from "./presets/outputs/vidt/colorToVidtColor";
import { BeatToColor } from "./presets/converters/beat/beatToColor";
import { FastLedMultiColorToMultiColor } from "./presets/outputs/vidt/fastLedMultiColorToMultiColor";
import { MultiColorToVidtMultiColor } from "./presets/outputs/vidt/multiColorToVidtMultiColor";
import { frontLedsConnected$ } from "./io/edt-frontleds";
import { backdropConnected$ } from "./io/edt-backdrop";

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
    if (scannedContentGroups[0].colorPalettes) {
        nextActionFromMsg(
            Actions.colorPalette(scannedContentGroups[0].colorPalettes[0]),
        );
    }
}

// The launchpad pages are dependent on many changing variables so it's build as an observable
launchpadPages$.subscribe((pages) =>
    nextActionFromMsg(Actions.launchpadPages(pages)),
);

// Our launchpadPageIndex is build from the connectedLaunchpads and pageChangeEvents
combineLatest([Actions$.launchpadPageChange, connectedLaunchpad$])
    .pipe(withLatestFrom(Actions$.launchpadPageIndex))
    .subscribe(([[pageChange, connectedPads], pageIndex]) => {
        pageIndex[pageChange.launchpad] = pageChange.page;

        Object.keys(pageIndex).forEach((key) => {
            if (!connectedPads.includes(key)) delete pageIndex[key];
        });

        nextActionFromMsg(Actions.launchpadPageIndex(pageIndex));
    });

console.log("GO GO GO!");

merge(
    connectedControllers$,
    connectedVidt$,
    connectedLaunchpad$,
    connectedThomas$,
).subscribe((connectedDevice) =>
    console.log("Connected device: ", connectedDevice),
);

backdropConnected$.subscribe((log) => console.log("BACKDROP CONNECTED:", log));
frontLedsConnected$.subscribe((log) =>
    console.log("FRONTLEDS CONNECTED:", log),
);

Actions$.contentGroup.subscribe((contentGroup) =>
    console.log("ContentGroup selected:", contentGroup.title),
);
Actions$.singleColor.subscribe((color) =>
    console.log("Color - Single: ", color),
);
Actions$.multiColor.subscribe((color) => console.log("Color - Multi:", color));
Actions$.vidtSingleColor.subscribe((color) =>
    console.log("ColorVidt - Single: ", color),
);
Actions$.vidtMultiColor.subscribe((color) =>
    console.log("ColorVidt - Multi: ", color),
);
Actions$.prepareVidt.subscribe((vidtPreset) =>
    console.log("Vidt change:", vidtPreset),
);
Actions$.presetState.subscribe((presetState) => {
    console.log(
        "Presets active: ",
        presetState
            .filter(({ state }) => state)
            .map(({ title, modifier }) => title + ` (${modifier})`),
    );
});

// Trigger some initial cues
[
    presetChange(new ColorToVidtColor(), 127, true),
    presetChange(new BeatToColor(), 127, true),
    presetChange(new FastLedMultiColorToMultiColor(), 127, true),
    presetChange(new MultiColorToVidtMultiColor(), 127, true),
].map(nextActionFromMsg);
