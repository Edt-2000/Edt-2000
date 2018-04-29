import {sendStateToControl} from '../outputs/edt-control';
import {IModifierOptions} from '../../../Shared/types';
import {Note} from '../../../Shared/midi';

export abstract class PresetLogic {
    state = false;
    modifier: number = 0;

    abstract modifierOptions: IModifierOptions;

    abstract title: string;
    abstract note: Note;

    startPreset(modifier: number) {
        console.log('Starting preset', this.title, modifier);
        this.modifier = modifier;
        this._stopPreset();
        this._startPreset();
        this.state = true;
        sendStateToControl();
    }

    stopPreset() {
        console.log('Stopping preset', this.title);
        this._stopPreset();
        this.state = false;
        sendStateToControl();
    }

    abstract _startPreset(): void;

    abstract _stopPreset(): void;
}

export const presetMap = new Map<number, PresetLogic>();
