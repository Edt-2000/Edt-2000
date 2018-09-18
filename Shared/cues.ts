import { BeatToColor } from '../Edt-Sledt/src/presets/converters/color/beatToColor'
import { ICue } from './types';
import { Actions } from './actions';
import { DrumToBeat } from '../Edt-Sledt/src/presets/converters/drums/drumToBeat';
import { DrumNotes } from './config';
import {MultiColorToVidtMultiColor} from "../Edt-Sledt/src/presets/outputs/vidt/multiColorToVidtMultiColor";
import {ColorToVidtColor} from "../Edt-Sledt/src/presets/outputs/vidt/colorToVidtColor";
import {MainBeatToVidtBeat} from "../Edt-Sledt/src/presets/outputs/vidt/mainBeatToVidtBeat";

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
            Actions.prepareVidt(3),
        ],
    },
    {
        label: 'Prepare Vidt',
        actions: [
            Actions.presetChange({
                preset: new MultiColorToVidtMultiColor().note,
                modifier: 0,
                state: true,
            }),
            Actions.presetChange({
                preset: new ColorToVidtColor().note,
                modifier: 0,
                state: true,
            }),
            Actions.presetChange({
                preset: new MainBeatToVidtBeat().note,
                modifier: 0,
                state: true,
            })
        ],
    }

];
