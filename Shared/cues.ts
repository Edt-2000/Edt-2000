import {ICue} from './types';
import {Actions} from "./actions";
import {DrumNotes} from "./config";
import {DrumSoundToBeat} from "../Edt-Sledt/src/presets/converters/drums/drumSoundToBeat";

export const presetCues: ICue[] = [
    {
        label: 'DrumKick -> ColorToAll',
        actions: [
            Actions.presetChange({
                preset: DrumSoundToBeat.note,
                modifier: DrumNotes._1,
                state: true,
            }),
            Actions.prepareVidt(3),
        ],
    },

];
