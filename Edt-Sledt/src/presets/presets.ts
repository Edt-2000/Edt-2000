import {BeatToColor} from './converters/color/beatToColor';
import {MidiToColors} from './converters/color/midiToColors';
import {DrumToBeat} from './converters/drums/drumToBeat';
import {ColorToKittSimple} from './outputs/fastledt/colorToKittSimple';
import {ColorToLEDTSolid} from './outputs/rgbledt/colorToLEDTSolid';
import {MainBeatToVidtBeat} from './outputs/vidt/mainBeatToVidtBeat';
import {ColorToVidtColor} from './outputs/vidt/colorToVidtColor';
import {ColorToAllSolid} from './outputs/_ledt/colorToAllSolid';
import {MidiToColorsOff} from './converters/color/midiToColorsOff';
import {StroboAll} from './outputs/_ledt/stroboAll';

export const presets = [
    new BeatToColor(),
    new MidiToColors(),
    new StroboAll(),
    new MidiToColorsOff(),
    new DrumToBeat(),
    new ColorToKittSimple(),
    new ColorToLEDTSolid(),
    new ColorToAllSolid(),
    new MainBeatToVidtBeat(),
    new ColorToVidtColor(),
];
