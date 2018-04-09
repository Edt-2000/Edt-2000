import {IPresetMsg} from './types';
import {ActionsUnion, createAction} from './fsa-helpers';

export const PRESET_ON = 'PRESET_ON';
export const PRESET_OFF = 'PRESET_OFF';
export const PRESET_STATE = 'PRESET_STATE';

export const Actions = {
    presetOn: (preset: IPresetMsg) => createAction(PRESET_ON, preset),
    presetOff: (preset: IPresetMsg) => createAction(PRESET_OFF, preset),
    presetState: (state: any) => createAction(PRESET_STATE, state),
};

export type Actions = ActionsUnion<typeof Actions>
