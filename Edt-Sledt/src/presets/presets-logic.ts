import {sendStateToControl} from '../outputs/edt-control';
import {IModifierOptions} from '../../../Shared/types';

export abstract class PresetLogic {
    state = false;
    modifier = 127; // Important; otherwise it will send noteOff

    modifierOptions?: IModifierOptions = {};

    startPreset(modifier: number) {
        console.log('Starting preset', modifier);
        this.modifier = modifier;
        this._stopPreset();
        this._startPreset();
        this.state = true;
        sendStateToControl();
    }

    stopPreset() {
        console.log('Stopping preset');
        this._stopPreset();
        this.state = false;
        sendStateToControl();
    }

    protected abstract _startPreset(): void;

    protected abstract _stopPreset(): void;
}
