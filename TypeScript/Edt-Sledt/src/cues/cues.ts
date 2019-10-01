import { ICue } from '../../../Shared/helpers/types';
import { drumCues } from './drums/drums';
import { Actions } from '../../../Shared/actions';
import { getPresetNote } from '../presets/presets';
import { DrumSoundMap } from '../presets/converters/drums/drumSoundMap';
import { DrumSounds } from '../../../Shared/drums';
import { DrumNotes } from '../../../Shared/config';
import { DrumToMidi } from '../presets/inputs/drumToMidi';

const edtDrumCues = {
    label: 'EdtDrumKitDefault',
    actions: [
        Actions.presetChange({
            preset: getPresetNote(new DrumToMidi(1)),
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
};

export const presetCues: ICue[] = [
    // ...edtDrumCues,
    ...drumCues,
];
