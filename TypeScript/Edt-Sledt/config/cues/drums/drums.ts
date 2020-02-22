import { Actions } from '../../../../Shared/actions/actions';
import { DrumSoundToBeat } from '../../../src/presets/converters/drums/drumSoundToBeat';
import { VidtPresets } from '../../../../Shared/vidt-presets';
import { BeatToNextWord } from '../../../src/presets/converters/words/beatToNextWord';
import { BeatToColor } from '../../../src/presets/converters/color/beatToColor';
import { ColorToVidtColor } from '../../../src/presets/outputs/vidt/colorToVidtColor';
import { ColorToFastLedSolid } from '../../../src/presets/outputs/fastledt/colorToFastLedSolid';
import { ColorToRGBLedSolid } from '../../../src/presets/outputs/rgbledt/colorToRGBLedSolid';
import { DrumSounds } from '../../config';
import { presetChange } from '../../../src/presets/presets-logic';

export const drumCues = [
    {
        label: 'DrumKick -> Beat -> Color -> All',
        actions: [
            presetChange(new DrumSoundToBeat(), DrumSounds.kick, true),
            presetChange(new BeatToColor(), 127, true),
            presetChange(new ColorToVidtColor(), 127, true),
            presetChange(new ColorToFastLedSolid(), 127, true),
            presetChange(new ColorToRGBLedSolid(), 127, true),
        ],
    },
    {
        label: 'VidtNextWordOnBeat',
        actions: [
            presetChange(new BeatToNextWord(), 127, true),
            Actions.prepareVidt(VidtPresets.karaoke),
        ],
    },
];
