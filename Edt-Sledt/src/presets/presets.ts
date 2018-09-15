import {BeatToColor} from './converters/color/beatToColor';
import {MidiToColors} from './converters/color/midiToColors';
import {DrumToBeat} from './converters/drums/drumToBeat';
import {MainBeatToVidtBeat} from './outputs/vidt/mainBeatToVidtBeat';
import {ColorToVidtColor} from './outputs/vidt/colorToVidtColor';
import {ColorToAllSolid} from './outputs/_ledt/colorToAllSolid';
import {MultiColorToVidtMultiColor} from "./outputs/vidt/multiColorToVidtMultiColor";
import {ColorToFastLedSolid} from "./outputs/fastledt/colorToFastLedSolid";
import {DrumToVidt} from "./outputs/vidt/drumToVidt";
import {DrumsToFastLedStrip} from "./outputs/fastledt/drumsToFastLedStrip";


export const presets = [
    new BeatToColor(),
    new MidiToColors(),
    new DrumToBeat(),
    new ColorToAllSolid(),
    new MainBeatToVidtBeat(),
    new ColorToVidtColor(),
    new ColorToFastLedSolid(),
    new MultiColorToVidtMultiColor(),
    new DrumToVidt(),
    new DrumsToFastLedStrip(),
];
