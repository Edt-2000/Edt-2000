import { PresetLogic } from '../../presets-logic';
import { Actions, Actions$, nextActionFromMsg } from '../../../../../Shared/actions';
import { withLatestFrom } from 'rxjs/operators';
import { ModifierGroup } from '../../../../../Shared/types';

export class BeatToColor extends PresetLogic {
    modifierOptions = {
        group: ModifierGroup.Color,
    };

    private index = -1;

    protected _startPreset(): void {
        this.addSub(
            Actions$.mainBeat
                .pipe(withLatestFrom(Actions$.multiColor))
                .subscribe(([, colors]) => {
                    // Calculate new index with modulo
                    this.index = (this.index + 1) % colors.length;
                    nextActionFromMsg(Actions.singleColor(colors[this.index]));
                }),
        );
    }

    protected _stopPreset(): void {
    }
}
