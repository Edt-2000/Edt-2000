import {BeatToColor} from './converters/color/beatToColor';
import {MidiToColors} from './converters/color/midiToColors';
import {DrumToBeat} from './converters/drums/drumToBeat';
import {MainBeatToVidtBeat} from './outputs/vidt/mainBeatToVidtBeat';
import {ColorToVidtColor} from './outputs/vidt/colorToVidtColor';
import {ColorToAllSolid} from './outputs/_ledt/colorToAllSolid';
import {ColorToFastLedSolid} from './outputs/fastledt/colorToFastLedSolid';

export const presets = [
    new BeatToColor(),
    new MidiToColors(),
    new DrumToBeat(),
    new ColorToFastLedSolid(),
    new ColorToAllSolid(),
    new MainBeatToVidtBeat(),
    new ColorToVidtColor(),
];
