import { PresetLogic } from '../../presets-logic';
import { Actions, Actions$, nextActionFromMsg } from '../../../../../Shared/actions';
import { withLatestFrom } from 'rxjs/operators';
import { ModifierGroup } from '../../../../../Shared/types';

export class BeatToNextWord extends PresetLogic {
    modifierOptions = {
        group: ModifierGroup.Vidt,
    };

    private index: number;

    protected _startPreset(): void {
        this.index = -1;
        this.addSub(
            Actions$.mainBeat
                .pipe(withLatestFrom(Actions$.wordSet))
                .subscribe(([, wordSet]) => {
                    // TODO: Use rxjs operator
                    // Calculate index++ but wrap around if too far
                    this.index++;
                    if (this.index >= wordSet.length) this.index = 0;
                    nextActionFromMsg(Actions.mainText(wordSet[this.index]));
                }),
        );
    }

    protected _stopPreset(): void {
    }
}