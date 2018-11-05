import {ICue} from './types';
import {Actions, nextActionFromMsg} from "./actions";
import {DrumNotes} from "./config";
import {DrumSoundToBeat} from "../Edt-Sledt/src/presets/converters/drums/drumSoundToBeat";

const presetCues: ICue[] = [
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


nextActionFromMsg(Actions.cueList(presetCues));
export const CueListSetup = 'CueListSetup';
