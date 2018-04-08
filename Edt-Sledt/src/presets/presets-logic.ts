import {ctrlSocketOut$} from '../communication/sockets';
import {Actions} from '../../../SharedTypes/actions';
import {Note} from '../../../SharedTypes/midi';

export abstract class PresetLogic {
    active = false;

    abstract title: string;

    startPreset(velocity: number) {
        if (!this.active) {
            this._startPreset(velocity);
            this.active = true;
            ctrlSocketOut$.next({
                type: Actions.PRESET_ON,
                preset: this.title,
            })
        }
    }

    stopPreset() {
        if (this.active) {
            this._stopPreset();
            this.active = false;
            ctrlSocketOut$.next({
                type: Actions.PRESET_OFF,
                preset: this.title,
            })
        }
    }

    abstract _startPreset(velocity: number): void;

    abstract _stopPreset(): void;
}

export const presetMap = new Map<Note, PresetLogic>();
