import {Note} from './midi';

export enum Actions {
    PRESET_ON = 'PRESET_ON',
    PRESET_OFF = 'PRESET_OFF',
}

export class PresetOnAction {
    type: Actions.PRESET_ON;

    constructor(payload: {
        preset: Note
    }) {}
}
