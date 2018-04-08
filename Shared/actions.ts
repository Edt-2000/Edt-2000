import {Note} from './midi';

export class PresetOnAction {
    type: 'PRESET_ON';

    constructor(payload: {
        preset: Note
    }) {}
}

export class PresetOffAction {
    type: 'PRESET_OFF';

    constructor(payload: {
        preset: Note
    }) {}
}

export class PresetStateUpdate {
    type: 'PRESET_STATE';
}

type presetActions = PresetOnAction | PresetOffAction | PresetStateUpdate;



/** Exported action types **/
export type controlActions = presetActions;
