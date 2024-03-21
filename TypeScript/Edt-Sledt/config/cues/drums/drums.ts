import { Actions } from '../../../../Shared/actions/actions';
import { DrumSoundToBeat } from '../../../src/presets/converters/beat/drumSoundToBeat';
import { VidtPresets } from '../../../../Shared/vidt-presets';
import { BeatToNextWord } from '../../../src/presets/converters/./beat/beatToNextWord';
import { BeatToColor } from '../../../src/presets/converters/beat/beatToColor';
import { ColorToVidtColor } from '../../../src/presets/outputs/vidt/colorToVidtColor';
import { DrumNotes, DrumSounds } from '../../config';
import { presetChange } from '../../../src/presets/presets-logic';
import { MidiChannelToMainDrum } from '../../../src/presets/converters/instruments/midiChannelToMainDrum';
import { DrumSoundMap } from '../../../src/presets/converters/instruments/drumSoundMap';

export const drumCues = [
    {
        label: 'Colors',
        actions: [
            presetChange(new ColorToVidtColor(), 127, true),
            presetChange(new BeatToColor(), 127, true),
        ],
    },
    {
        label: 'Midi10Kick',
        actions: [
            presetChange(new MidiChannelToMainDrum(), 10, true),
            presetChange(new DrumSoundMap(DrumSounds.kick), DrumNotes._1, true),
        ],
    },
    {
        label: 'DrumKick->Beat',
        actions: [
            presetChange(new DrumSoundToBeat(), DrumSounds.kick, true),
            presetChange(new BeatToColor(), 127, true),
        ],
    },
    {
        label: 'WordBeatKaraoke',
        actions: [
            presetChange(new BeatToNextWord(), 127, true),
            Actions.prepareVidt(VidtPresets.karaoke),
        ],
    },
    {
        label: 'WordBeatKaraokeOff',
        actions: [
            presetChange(new BeatToNextWord(), 127, false),
        ],
    },
];
