import { Actions } from '../../../../Shared/actions';
import { DrumSoundToBeat } from '../../presets/converters/drums/drumSoundToBeat';
import { DrumNotes } from '../../../../Shared/config';
import { vidtPresets } from '../../../../Shared/vidt-presets';
import { DrumSoundMap } from '../../presets/converters/drums/drumSoundMap';
import { DrumSounds } from '../../../../Shared/drums';
import { getPresetNote } from '../../presets/presets';
import { MidiChannelToMainDrum } from '../../presets/converters/drums/midiChannelToMainDrum';
import { BeatToNextWord } from '../../presets/converters/words/beatToNextWord';
import { MainBeatToVidtBeat } from '../../presets/outputs/vidt/mainBeatToVidtBeat';
import { BeatToColor } from '../../presets/converters/color/beatToColor';
import { ColorToVidtColor } from '../../presets/outputs/vidt/colorToVidtColor';
import { ColorToFastLedSolid } from '../../presets/outputs/fastledt/colorToFastLedSolid';
import { ColorToRGBLedSolid } from '../../presets/outputs/rgbledt/colorToRGBLedSolid';

export const drumCues = [
    {
        label: 'DefaultDrumMap',
        actions: [
            Actions.presetChange({
                preset: getPresetNote(new MidiChannelToMainDrum()),
                modifier: 10,
                state: true,
            }),
            Actions.presetChange({
                preset: getPresetNote(new DrumSoundMap(DrumSounds.kick)),
                modifier: DrumNotes._1,
                state: true,
            }),
            Actions.presetChange({
                preset: getPresetNote(new DrumSoundMap(DrumSounds.mainSnare)),
                modifier: DrumNotes._2,
                state: true,
            }),
        ],
    },
    {
        label: 'DrumKick -> Beat & VidtBeat',
        actions: [
            Actions.presetChange({
                preset: getPresetNote(new DrumSoundToBeat()),
                modifier: DrumSounds.kick,
                state: true,
            }),
            Actions.presetChange({
                preset: getPresetNote(new MainBeatToVidtBeat()),
                modifier: 127,
                state: true,
            }),
        ],
    },
    {
        label: 'DrumKick -> Beat -> Color -> All',
        actions: [
            Actions.presetChange({
                preset: getPresetNote(new DrumSoundToBeat()),
                modifier: DrumSounds.kick,
                state: true,
            }),
            Actions.presetChange({
                preset: getPresetNote(new BeatToColor()),
                modifier: 127,
                state: true,
            }),
            Actions.presetChange({
                preset: getPresetNote(new ColorToVidtColor()),
                modifier: 127,
                state: true,
            }),
            Actions.presetChange({
                preset: getPresetNote(new ColorToFastLedSolid()),
                modifier: 127,
                state: true,
            }),
            Actions.presetChange({
                preset: getPresetNote(new ColorToRGBLedSolid()),
                modifier: 127,
                state: true,
            }),
        ],
    },
    {
        label: 'VidtNextWordOnBeat',
        actions: [
            Actions.presetChange({
                preset: getPresetNote(new BeatToNextWord()),
                modifier: 127,
                state: true,
            }),
            Actions.presetChange({
                preset: getPresetNote(new MainBeatToVidtBeat()),
                modifier: 127,
                state: true,
            }),
            Actions.prepareVidt(vidtPresets.karaoke),
        ],
    },
];
