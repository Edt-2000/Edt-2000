import { IModifierOptions } from '../../../Shared/types';
import { getPresetState } from './presets';
import { Subscription } from 'rxjs';
import { Actions, nextActionFromMsg } from '../../../Shared/actions';

export abstract class PresetLogic {
    readonly modifierOptions: IModifierOptions;
    title: string = this.constructor.name;

    state = false;
    modifier = 127; // Important; otherwise it will send noteOff

    protected subscriptions: Subscription[] = [];

    startPreset(modifier: number) {
        console.log('Starting preset', this.title, modifier);
        this.modifier = modifier;
        this._stopPreset();
        this._startPreset();
        this.state = true;
        nextActionFromMsg(Actions.presetState(getPresetState()));
    }

    stopPreset() {
        console.log('Stopping preset', this.title);
        // Unsubscribe and reset array
        this.subscriptions.forEach(sub => sub.unsubscribe());
        this.subscriptions = [];

        this._stopPreset();
        this.state = false;
        nextActionFromMsg(Actions.presetState(getPresetState()));
    }

    addSub(sub: Subscription) {
        this.subscriptions.push(sub);
    }

    protected abstract _startPreset(): void;

    protected abstract _stopPreset(): void;
}
