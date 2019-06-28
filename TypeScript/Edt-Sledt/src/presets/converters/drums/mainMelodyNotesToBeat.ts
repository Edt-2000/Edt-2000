import { PresetLogic } from '../../presets-logic';
import { ModifierGroup } from '../../../../../Shared/types';

export class MainMelodyNotesToBeat extends PresetLogic {
    modifierOptions = {
        group: ModifierGroup.Drums,
    };

    protected _startPreset (): void {
    }

    protected _stopPreset (): void {
    }
}
