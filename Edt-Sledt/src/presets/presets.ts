import {BeatToColor} from './converters/color/beatToColor';
import {MidiToColors} from './converters/color/midiToColors';
import {DrumToBeat} from './converters/drums/drumToBeat';
import {MainBeatToVidtBeat} from './outputs/vidt/mainBeatToVidtBeat';
import {ColorToVidtColor} from './outputs/vidt/colorToVidtColor';
import {ColorToAllSolid} from './outputs/_ledt/colorToAllSolid';
import {MultiColorToVidtMultiColor} from "./outputs/vidt/multiColorToVidtMultiColor";
import {ColorToFastLedSolid} from "./outputs/fastledt/colorToFastLedSolid";
import {DrumToVidt} from "./outputs/vidt/drumToVidt";
import {ColorStrobeFastLed} from "./outputs/fastledt/colorStrobeFastLed";
import {ColorStrobeRGBLed} from "./outputs/rgbledt/colorStrobeRGBLed";
import {DrumsToFastLedStrip} from "./outputs/fastledt/drumsToFastLedStrip";


export const presets = [
    new BeatToColor(),
    new MidiToColors(),
    new DrumToBeat(),
    new ColorToAllSolid(),
    new ColorStrobeFastLed(),
    new ColorStrobeRGBLed(),
    new MainBeatToVidtBeat(),
    new ColorToVidtColor(),
    new ColorToFastLedSolid(),
    new MultiColorToVidtMultiColor(),
    new DrumToVidt(),
    new DrumsToFastLedStrip(),
];


// TODO list:

/**

 rainbowspark from beat with modifiers for intensity? from color
 rainbowspark from beat with modifiers for intensity? from multi-color
 preset: simple mapping from multicolor to all fastLEDs
 twinkle from beat with modifiers for multi-color vs random
 chase preset based on channel midi notes
 chase preset based on drum inputs (each drum is a different color or soeed?)
 chase preset based on beat

 add flash-length to Actions$ and create button for Control

 auto-index photo and video files instead of manual adding
 add video and photo files to .gitignore directory

 add more colors to multi-color selection in Control
 Add cues for some presets to switch quickly

 create multi-color system

 **/
