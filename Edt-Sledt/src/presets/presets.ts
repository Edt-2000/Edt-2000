import {BeatToColor} from './converters/color/beatToColor';
import {PrepareVidtPreset} from './outputs/vidt/prepareVidtPreset';
import {MidiToColors} from './converters/color/midiToColors';
import {DrumToBeat} from './converters/drums/drumToBeat';
import {ColorToKittSimple} from './outputs/fastledt/colorToKittSimple';
import {ColorToLEDTSolid} from './outputs/rgbledt/colorToLEDTSolid';

// Simply add a preset in this array to activate it!
export const presets = [
    new BeatToColor(),
    new MidiToColors(),
    new DrumToBeat(),
    new PrepareVidtPreset(),
    new ColorToKittSimple(),
    new ColorToLEDTSolid(),
];
