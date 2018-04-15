import {DrumToBeat} from '../Edt-Sledt/src/presets/converters/drums/drumToBeat';
import {DrumNotes} from '../Edt-Sledt/src/inputs/music-triggers';
import {BeatToColor} from '../Edt-Sledt/src/presets/converters/color/beatToColor'
import {IPresetCue} from './types';

export const presetCues: IPresetCue[] = [
    {
        title: 'DrumKick -> ColorChanges',
        description: 'Drumkick -> Beat, Beat to ColorChange',
        presets: [
            {
                preset: new DrumToBeat().note,
                modifier: DrumNotes._1,
                state: true,
            },
            {
                preset: new BeatToColor().note,
                modifier: 127,
                state: true,
            },
        ],
    }
];
