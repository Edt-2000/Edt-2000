import { ICue } from '../../../Shared/types';
import { drumCues } from './drums/drums';
import { DrumSoundMap } from '../../src/presets/converters/drums/drumSoundMap';
import { DrumSounds } from '../../../Shared/drums';
import { DrumToMidi } from '../../src/presets/inputs/drumToMidi';
import { DrumNotes } from '../config';
import { presetChange } from '../../src/presets/presets-logic';

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
