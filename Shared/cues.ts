import {BeatToColor} from '../Edt-Sledt/src/presets/converters/color/beatToColor'
import {ICue} from './types';
import {Actions, PREPARE_VIDT} from './actions';
import {DrumToBeat} from '../Edt-Sledt/src/presets/converters/drums/drumToBeat';
import {DrumNotes} from '../Edt-Sledt/src/inputs/music-triggers';

export const presetCues: ICue[] = [
    {
        label: 'DrumKick -> ColorToAll',
        actions: [
            Actions.presetChange({
                preset: new DrumToBeat().note,
                modifier: DrumNotes._1,
                state: true,
            }),
            Actions.presetChange({
                preset: new BeatToColor().note,
                modifier: 127,
                state: true,
            }),
            Actions.prepareVidt(1),
        ],
    }
];
