import { Actions } from '../../../../Shared/actions';
import { DrumSoundToBeat } from '../../presets/converters/drums/drumSoundToBeat';
import { DrumNotes } from '../../../../Shared/config';
import { VidtPresets } from '../../../../Shared/vidt-presets';
import { DrumSoundMap } from '../../presets/converters/drums/drumSoundMap';
import { DrumSounds } from '../../../../Shared/drums';
import { MidiChannelToMainDrum } from '../../presets/converters/drums/midiChannelToMainDrum';
import { BeatToNextWord } from '../../presets/converters/words/beatToNextWord';
import { MainBeatToVidtBeat } from '../../presets/outputs/vidt/mainBeatToVidtBeat';
import { BeatToColor } from '../../presets/converters/color/beatToColor';
import { ColorToVidtColor } from '../../presets/outputs/vidt/colorToVidtColor';
import { ColorToFastLedSolid } from '../../presets/outputs/fastledt/colorToFastLedSolid';
import { ColorToRGBLedSolid } from '../../presets/outputs/rgbledt/colorToRGBLedSolid';
import { presetChange } from '../../presets/presets';

export const drumCues = [
    {
        label: 'DefaultDrumMap',
        actions: [
            presetChange(new MidiChannelToMainDrum(), 10, true),
            presetChange(new DrumSoundMap(DrumSounds.kick), DrumNotes._1, true),
            presetChange(new DrumSoundMap(DrumSounds.mainSnare), DrumNotes._2, true),
        ],
    },
    {
        label: 'DrumKick -> Beat & VidtBeat',
        actions: [
            presetChange(new DrumSoundToBeat(), DrumSounds.kick, true),
            presetChange(new MainBeatToVidtBeat(), 127, true),
        ],
    },
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
            presetChange(new MainBeatToVidtBeat(), 127, true),
            Actions.prepareVidt(VidtPresets.karaoke),
        ],
    },
];
