import {BeatToColor} from './converters/color/beatToColor';
import {MidiToColors} from './converters/color/midiToColors';
import {DrumToBeat} from './converters/drums/drumToBeat';
import {ColorToKittSimple} from './outputs/fastledt/colorToKittSimple';
import {ColorToLEDTSolid} from './outputs/rgbledt/colorToLEDTSolid';
import {MainBeatToVidtBeat} from './outputs/vidt/mainBeatToVidtBeat';
import {ColorToVidtColor} from './outputs/vidt/colorToVidtColor';
import {ColorToAllSolid} from './outputs/_ledt/colorToAllSolid';
import {MultiColorToVidtMultiColor} from "./outputs/vidt/multiColorToVidtMultiColor";

export const presets = [
    new BeatToColor(),
    new MidiToColors(),
    new DrumToBeat(),
    new ColorToKittSimple(),
    new ColorToLEDTSolid(),
    new ColorToAllSolid(),
    new MainBeatToVidtBeat(),
    new ColorToVidtColor(),
    new MultiColorToVidtMultiColor(),
];
