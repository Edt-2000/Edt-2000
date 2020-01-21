import { presets } from './presets';
import { Subscription } from 'rxjs';
import { Actions, nextActionFromMsg } from '../../../Shared/actions/actions';
import { IControlPresetMsg, IModifierOptions } from '../../../Shared/actions/types';

export abstract class PresetLogic {
    readonly modifierOptions: IModifierOptions;
    title: string = this.constructor.name;

    state = false;
    modifier = 127; // Important; otherwise it will send noteOff

    protected subscriptions: Subscription[] = [];

    startPreset(modifier: number) {
        this.modifier = modifier;
        this._stopPreset();
        this._startPreset();
        this.state = true;
        nextActionFromMsg(Actions.presetState(getPresetState()));
    }

    stopPreset() {
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

export const presetChange = (preset: PresetLogic, modifier: number, state: boolean) => {
    return Actions.presetChange({
        preset: getPresetNote(preset),
        modifier,
        state,
    });
};

function getPresetNote(preset: PresetLogic): number {
    return +Object.getOwnPropertyNames(presets).find(presetNote => presets[presetNote].title === preset.title);
}

export function getPresetState(): IControlPresetMsg[] {
    return Object.getOwnPropertyNames(presets).map(presetNr => {
        const preset = presets[presetNr];
        return {
            preset: +presetNr, // preset key is a string, but send it as number
            modifier: preset.modifier,
            state: preset.state,
            title: preset.title,
            config: {
                select: preset.modifierOptions.select,
                continuous: preset.modifierOptions.continuous,
                group: preset.modifierOptions.group,
            },
        } as IControlPresetMsg;
    });
}
