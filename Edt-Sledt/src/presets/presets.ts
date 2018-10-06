import {BeatToColor} from './converters/color/beatToColor';
import {MidiToColors} from './converters/color/midiToColors';
import {DrumToBeat} from './converters/drums/drumToBeat';
import {MainBeatToVidtBeat} from './outputs/vidt/mainBeatToVidtBeat';
import {ColorToVidtColor} from './outputs/vidt/colorToVidtColor';
import {MultiColorToVidtMultiColor} from "./outputs/vidt/multiColorToVidtMultiColor";
import {ColorToFastLedSolid} from "./outputs/fastledt/colorToFastLedSolid";
import {DrumToVidt} from "./outputs/vidt/drumToVidt";
import {ColorStrobeFastLed} from "./outputs/fastledt/colorStrobeFastLed";
import {ColorStrobeRGBLed} from "./outputs/rgbledt/colorStrobeRGBLed";
import {DrumsToFastLedStrip} from "./outputs/fastledt/drumsToFastLedStrip";
import {ColorToRGBLedSolid} from "./outputs/rgbledt/colorToRGBLedSolid";
import {ColorToInverseVidtColor} from "./converters/color/colorToInverseVidtColor";
import {BeatToColorSpark} from "./outputs/fastledt/beatToColorSpark";
import {BeatToRainbowSpark} from "./outputs/fastledt/beatToRainbowSpark";
import {Note} from "../../../Shared/midi";

export const presets = {
    [Note.A3]: new BeatToColor(),
    [Note.B3]: new BeatToColorSpark(),
    [Note.C3]: new BeatToRainbowSpark(),

    [Note.A2]: new MidiToColors(),

    [Note.A1]: new DrumToBeat(),
    [Note.B1]: new DrumsToFastLedStrip(),

    [Note.A0]: new ColorToFastLedSolid(),
    [Note.B0]: new ColorToRGBLedSolid(),
    [Note.C0]: new ColorStrobeFastLed(),
    [Note.D0]: new ColorStrobeRGBLed(),

    [Note.A7]: new MainBeatToVidtBeat(),
    [Note.B7]: new ColorToVidtColor(),
    [Note.C7]: new ColorToInverseVidtColor(),
    [Note.D7]: new MultiColorToVidtMultiColor(),
    [Note.E7]: new DrumToVidt(),
    // [Note.]: new BeatToNextWord(),
};

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
