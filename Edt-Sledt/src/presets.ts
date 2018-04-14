import {BeatToColor} from './presets/converters/color/beatToColor';
import {DrumToBeat} from './presets/converters/drums/drumToBeat';
import {Note} from '../../Shared/midi';
import {BeatToVidtBounce} from './presets/outputs/beatToVidtBounce';
import {MidiToColors} from './presets/converters/color/midiToColors';

export const presets = {
    [Note.C_2]: new BeatToColor(),
    [Note.C$_2]: new DrumToBeat(),
    [Note.D_2]: new MidiToColors(),

    [Note.C_1]: new BeatToVidtBounce(),
};
