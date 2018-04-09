import {Note} from '../../../Shared/midi';

export abstract class PresetLogic {
    active = false;

    abstract title: string;

    startPreset(velocity: number) {
        if (!this.active) {
            this._startPreset(velocity);
            this.active = true;

        }
    }

    stopPreset() {
        if (this.active) {
            this._stopPreset();
            this.active = false;
        }
    }

    abstract _startPreset(velocity: number): void;

    abstract _stopPreset(): void;
}

export const presetMap = new Map<Note, PresetLogic>();
