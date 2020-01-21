import { drumCues } from './drums/drums';
import { DrumSoundMap } from '../../src/presets/converters/drums/drumSoundMap';
import { DrumToMidi } from '../../src/presets/inputs/drumToMidi';
import { DrumNotes, DrumSounds } from '../config';
import { presetChange } from '../../src/presets/presets-logic';
import { ICue } from '../../../Shared/actions/types';

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
