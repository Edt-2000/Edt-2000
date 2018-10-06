import {Subscription} from 'rxjs/Subscription';
import {PresetLogic} from '../../presets-logic';
import {Actions, Actions$, nextActionFromMsg} from '../../../../../Shared/actions';

export class BeatToNextWord extends PresetLogic {
    modifierOptions = {
        select: [
            {label: 'cabrio', value: 1},
            {label: 'theme', value: 127},
            ],
    };

    private index: number = 0;
    private subscription: Subscription;

    // TODO: Move wordsets to a stream instead of hard coded
    private wordSets = {
        1: ['C', 'A', 'B', 'R', 'I', 'O', 'L', 'E', 'T', 'T', 'A'],
        127: [
            'EINDHOVEN',
            'MAKER',
            'FAIR',
        ],
    };

    protected _startPreset(): void {
        this.subscription = Actions$.mainBeat.subscribe(() => {
            if(this.wordSets[this.modifier]) {
                this.index = this.index + 1 % this.wordSets[this.modifier].length;
                nextActionFromMsg(Actions.singleColor(this.wordSets[this.modifier][this.index]));
            }
        });
    }

    protected _stopPreset(): void {
        if (typeof this.subscription !== 'undefined') this.subscription.unsubscribe();
    }
}
