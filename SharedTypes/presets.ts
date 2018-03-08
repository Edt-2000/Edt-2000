import {BeatToColor} from '../Edt-Sledt/src/presets/converters/color/beatToColor';
import {DrumToBeat} from '../Edt-Sledt/src/presets/converters/drums/drumToBeat';
import {Note} from '../Edt-Sledt/src/inputs/midi';
import {BeatToVidtBounce} from '../Edt-Sledt/src/presets/outputs/beatToVidtBounce';

export const presets = {
    [Note.C0]: new BeatToColor(),
    [Note.C_0]: new DrumToBeat(),

    [Note.C1]: new BeatToVidtBounce(),
};
