import { Actions } from '../../../../Shared/actions';
import { DrumSoundToBeat } from '../../presets/converters/drums/drumSoundToBeat';
import { DrumNotes } from '../../../../Shared/config';
import { vidtPresets } from '../../../../Shared/vidt-presets';

export const drumCues = [
    {
        label: 'DrumKick -> ColorToAll',
        actions: [
            Actions.presetChange({
                preset: DrumSoundToBeat.note,
                modifier: DrumNotes._1,
                state: true,
            }),
            Actions.prepareVidt(vidtPresets.color),
        ],
    },
];
