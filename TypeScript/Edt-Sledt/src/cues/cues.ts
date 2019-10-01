import { ICue } from '../../../Shared/helpers/types';
import { drumCues } from './drums/drums';
import { DrumSoundMap } from '../presets/converters/drums/drumSoundMap';
import { DrumSounds } from '../../../Shared/drums';
import { DrumNotes } from '../../../Shared/config';
import { DrumToMidi } from '../presets/inputs/drumToMidi';
import { presetChange } from '../../../Shared/helpers/utils';

const edtDrumCues = [
    {
        label: 'EdtDrumKitDefault',
        actions: [
            presetChange(new DrumToMidi(1), 10, true),
            presetChange(new DrumSoundMap(DrumSounds.kick), DrumNotes._1, true),
            presetChange(new DrumSoundMap(DrumSounds.mainSnare), DrumNotes._2, true),
        ],
    },
];

export const presetCues: ICue[] = [
    ...edtDrumCues,
    ...drumCues,
];
