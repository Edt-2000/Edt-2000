import {IControlPresetMsg, IPresetCue, IPresetMsg} from './types';
import {BehaviorSubject, Subject} from '../Edt-Sledt/node_modules/rxjs';
import {ActionsUnion, createAction} from './fsa-helpers';

export const PRESET_CHANGE = 'PRESET_CHANGE';
export const PRESET_STATE = 'PRESET_STATE';
export const CUE_LIST = 'CUE_LIST';

export const Actions = {
    presetChange: (payload: IPresetMsg) => createAction(PRESET_CHANGE, payload),
    presetState: (payload: IControlPresetMsg[]) => createAction(PRESET_STATE, payload),
    cueList: (payload: IPresetCue[]) => createAction(CUE_LIST, payload),
};

export type Actions = ActionsUnion<typeof Actions>;

export const Actions$ = {
    presetChange: <Subject<IPresetMsg>> new Subject(),
    presetState: <BehaviorSubject<IControlPresetMsg[]>> new BehaviorSubject([]),
    cueList: <BehaviorSubject<IPresetCue[]>> new BehaviorSubject([]),
};

export function nextActionFromMsg(msg: Actions) {
    if (msg.type === PRESET_CHANGE) Actions$.presetChange.next(msg.payload);
    if (msg.type === PRESET_STATE) Actions$.presetState.next(msg.payload);
    if (msg.type === CUE_LIST) Actions$.cueList.next(msg.payload);
}
