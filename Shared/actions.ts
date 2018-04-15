import {IControlPresetMsg, IPresetMsg} from './types';
import {ActionsUnion, createAction} from './fsa-helpers';

export const PRESET_CHANGE = 'PRESET_CHANGE';
export const PRESET_STATE = 'PRESET_STATE';

export const Actions = {
    presetChange: (payload: IPresetMsg) => createAction(PRESET_CHANGE, payload),
    presetState: (payload: IControlPresetMsg[]) => createAction(PRESET_STATE, payload),
};

export type Actions = ActionsUnion<typeof Actions>
