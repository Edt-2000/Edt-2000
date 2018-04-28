import {IControlPresetMsg, IPresetCue, IPresetMsg} from './types';
import {ActionsUnion, buildAction} from '../Edt-Sledt/node_modules/typesafe-actions/es5-commonjs';

const PRESET_CHANGE = 'PRESET_CHANGE';
const PRESET_STATE = 'PRESET_STATE';
const CUE_LIST = 'CUE_LIST';

export const PresetActions = {
    presetChange: buildAction(PRESET_CHANGE).payload<IPresetMsg>(),
    presetState: buildAction(PRESET_STATE).payload<IControlPresetMsg[]>(),
    cueList: buildAction(CUE_LIST).payload<IPresetCue[]>(),
};

export type ctrlActions = ActionsUnion<typeof PresetActions>;
