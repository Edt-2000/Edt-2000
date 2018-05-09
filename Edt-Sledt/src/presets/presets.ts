import {BeatToColor} from './converters/color/beatToColor';
import {MidiToColors} from './converters/color/midiToColors';
import {DrumToBeat} from './converters/drums/drumToBeat';
import {ColorToKittSimple} from './outputs/fastledt/colorToKittSimple';
import {ColorToLEDTSolid} from './outputs/rgbledt/colorToLEDTSolid';

export const presets = [
    new BeatToColor(),
    new MidiToColors(),
    new DrumToBeat(),
    new ColorToKittSimple(),
    new ColorToLEDTSolid(),
];
