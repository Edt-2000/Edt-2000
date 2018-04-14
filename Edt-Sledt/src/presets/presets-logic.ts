import {sendStateToControl} from '../outputs/edt-control';

export abstract class PresetLogic {
    state = false;
    modifier: number;

    abstract title: string;

    startPreset(modifier: number) {
        console.log('Starting preset', this.title);
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
