import {IModifierOptions} from '../../../Shared/types';
import {getPresetState, presets} from "./presets";
import {Subscription} from "rxjs";
import {Actions, nextActionFromMsg} from "../../../Shared/actions";

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
