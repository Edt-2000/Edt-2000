import {ICue} from '../../../Shared/types';
import {Actions, nextActionFromMsg} from "../../../Shared/actions";
import {DrumNotes} from "../../../Shared/config";
import {DrumSoundToBeat} from "../presets/converters/drums/drumSoundToBeat";

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
