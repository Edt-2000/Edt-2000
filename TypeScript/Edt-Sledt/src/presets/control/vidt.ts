import { ModifierGroup } from '../../../../Shared/types';
import { PresetLogic } from '../presets-logic';
import { Actions, nextActionFromMsg } from '../../../../Shared/actions';
import { vidtPresets, vidtPresetsArr } from '../../../../Shared/vidt-presets';

export class Vidt extends PresetLogic {
    modifierOptions = {
        select: vidtPresetsArr.map(preset => ({
            label: preset,
            value: vidtPresets[preset],
        })),
        group: ModifierGroup.Vidt,
    };

    protected _startPreset(): void {
        nextActionFromMsg(Actions.prepareVidt(vidtPresets[vidtPresets[this.modifier]]));
    }

    protected _stopPreset(): void {
        nextActionFromMsg(Actions.prepareVidt(vidtPresets.logo));
    }
}
