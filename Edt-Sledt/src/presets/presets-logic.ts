import {sendStateToControl} from '../outputs/edt-control';
import {IModifierOptions} from '../../../Shared/types';
import {presets} from "./presets";
import {Subscription} from "rxjs";

export abstract class PresetLogic {
    readonly title: string = this.constructor.name;
    readonly modifierOptions: IModifierOptions = {};

    state = false;
    modifier = 127; // Important; otherwise it will send noteOff

    protected subscriptions: Subscription[] = [];

    static get note(): number {
        return +Object.getOwnPropertyNames(presets).find(presetNote => presets[presetNote].title === this.name);
    }

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
        // Unsubscribe and reset array
        this.subscriptions.forEach(sub => sub.unsubscribe());
        this.subscriptions = [];

        this._stopPreset();
        this.state = false;
        sendStateToControl();
    }

    addSub(sub: Subscription) {
        this.subscriptions.push(sub);
    }

    protected abstract _startPreset(): void;

    protected abstract _stopPreset(): void;
}
