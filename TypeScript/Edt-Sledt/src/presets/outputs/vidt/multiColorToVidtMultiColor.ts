import { PresetLogic } from '../../presets-logic';
import { Actions, Actions$, nextActionFromMsg } from '../../../../../Shared/actions/actions';
import { MermaidConfig, ModifierGroup } from '../../../../../Shared/actions/types';

export class MultiColorToVidtMultiColor extends PresetLogic {
    mermaidConfig: MermaidConfig[];
    modifierOptions = {
        group: [
            ModifierGroup.Vidt,
            ModifierGroup.Color,
        ],
    };

    protected _startPreset(): void {
        this.addSub(
            Actions$.multiColor.subscribe(color => {
                nextActionFromMsg(Actions.vidtMultiColor(color));
            }),
        );
    }

    protected _stopPreset(): void {
    }
}
