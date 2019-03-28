import { Actions } from '../../../../Shared/actions';
import { DrumSoundToBeat } from '../../presets/converters/drums/drumSoundToBeat';
import { DrumNotes } from '../../../../Shared/config';
import { vidtPresets } from '../../../../Shared/vidt-presets';
import { DrumSoundMap } from '../../presets/converters/drums/drumSoundMap';
import { DrumSounds } from '../../../../Shared/drums';
import { getPresetNote } from '../../presets/presets';

export const drumCues = [
    {
        label: 'DefaultDrumMap',
        actions: [
            Actions.presetChange({
                preset: getPresetNote(new DrumSoundMap(DrumSounds.kick)),
                modifier: DrumNotes._1,
                state: true,
            }),
            Actions.presetChange({
                preset: getPresetNote(new DrumSoundMap(DrumSounds.snare)),
                modifier: DrumNotes._2,
                state: true,
            }),
        ],
    },
    {
        label: 'DrumKick -> Beat -> Color -> All',
        actions: [
            Actions.presetChange({
                preset: getPresetNote(new DrumSoundToBeat),
                modifier: DrumSounds.kick,
                state: true,
            }),
            Actions.prepareVidt(vidtPresets.color),
        ],
    },
];
