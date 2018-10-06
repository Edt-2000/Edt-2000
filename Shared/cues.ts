import {ICue} from './types';
import {Actions} from "./actions";
import {DrumNotes} from "./config";
import {DrumToBeat} from "../Edt-Sledt/src/presets/converters/drums/drumToBeat";

export const presetCues: ICue[] = [
    {
        label: 'DrumKick -> ColorToAll',
        actions: [
            Actions.presetChange({
                preset: DrumToBeat.note,
                modifier: DrumNotes._1,
                state: true,
            }),
            Actions.prepareVidt(3),
        ],
    },

];
