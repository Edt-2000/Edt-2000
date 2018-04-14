import {sendStateToControl} from '../outputs/edt-control';

export abstract class PresetLogic {
    active = false;

    abstract title: string;

    startPreset(velocity: number) {
        console.log('Starting preset', this.title);
        this._stopPreset();
        this._startPreset(velocity);
        this.active = true;
        sendStateToControl();
    }

    stopPreset() {
        if (this.active) {
            console.log('Stopping preset', this.title);
            this._stopPreset();
            this.active = false;
            sendStateToControl();
        }
    }

    abstract _startPreset(velocity: number): void;

    abstract _stopPreset(): void;
}

export const presetMap = new Map<number, PresetLogic>();
