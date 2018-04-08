import {BeatToColor} from './presets/converters/color/beatToColor';
import {DrumToBeat} from './presets/converters/drums/drumToBeat';
import {Note} from '../../Shared/midi';
import {BeatToVidtBounce} from './presets/outputs/beatToVidtBounce';
import {MidiToColors} from './presets/converters/color/midiToColors';

export const presets = {
    [Note.C0]: new BeatToColor(),
    [Note.C_0]: new DrumToBeat(),
    [Note.D0]: new MidiToColors(),

    [Note.C1]: new BeatToVidtBounce(),
};
