import { presets } from '../../config/presets';
import { Subscription } from 'rxjs';
import { Actions, nextActionFromMsg } from '../../../Shared/actions/actions';
import { IControlPresetMsg, IModifierOptions, MermaidConfig } from '../../../Shared/actions/types';

export abstract class PresetLogic {
    abstract readonly mermaidConfig: MermaidConfig[];
    readonly modifierOptions: IModifierOptions;
    title: string = this.constructor.name;

    state = false;
    modifier = 127; // Important; otherwise it will send noteOff

    protected subscriptions: Subscription[] = [];

    startPreset(modifier: number) {
        this.modifier = modifier;
        this.unsubAll();
        this._startPreset();
        this.state = true;
        nextActionFromMsg(Actions.presetState(getPresetState()));
    }

    stopPreset() {
        this.unsubAll();
        this._stopPreset();
        this.state = false;
        nextActionFromMsg(Actions.presetState(getPresetState()));
    }

    addSub(sub: Subscription) {
        this.subscriptions.push(sub);
    }

    unsubAll() {
        // Unsubscribe and reset array
        this.subscriptions.forEach(sub => sub.unsubscribe());
        this.subscriptions = [];
    }

    protected abstract _startPreset(): void;
    protected abstract _stopPreset(): void;
}

export const presetChange = (preset: PresetLogic, modifier: number, state: boolean) => {
    return Actions.presetChange({
        preset: +Object.getOwnPropertyNames(presets).find(presetNote => presets[presetNote].title === preset.title),
        modifier,
        state,
    });
};

export function getPresetState(): IControlPresetMsg[] {
    return Object.getOwnPropertyNames(presets).map(presetNr => {
        const {modifier, modifierOptions: config, mermaidConfig: mermaid, title, state} = presets[presetNr];
        return {
            // preset key is a string, but send it as number
            preset: +presetNr,
            modifier,
            state,
            title,
            config,
            mermaid,
        } as IControlPresetMsg;
    });
}
