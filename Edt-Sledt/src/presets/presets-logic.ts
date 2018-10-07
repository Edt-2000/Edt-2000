import {sendStateToControl} from '../outputs/edt-control';
import {IModifierOptions} from '../../../Shared/types';
import {presets} from "./presets";

export abstract class PresetLogic {
    readonly title: string = this.constructor.name;
    readonly modifierOptions: IModifierOptions = {};

    state = false;
    modifier = 127; // Important; otherwise it will send noteOff

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

    protected abstract _startPreset(): void;

    protected abstract _stopPreset(): void;

    static get note(): number {
        return +Object.getOwnPropertyNames(presets).find(presetNote => presets[presetNote].title === this.name);
    }
}
