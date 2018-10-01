import {Subscription} from 'rxjs/Subscription';
import {PresetLogic} from '../../presets-logic';
import {IModifierOptions} from '../../../../../Shared/types';
import {Note} from '../../../../../Shared/midi';
import {Actions, Actions$, nextActionFromMsg} from '../../../../../Shared/actions';

export class BeatToNextWord extends PresetLogic {
    title: string = 'BeatToNextWord';
    note = Note.G$7;

    modifierOptions: IModifierOptions = {
        select: [
            {label: 'cabrio', value: 1},
            {label: 'theme', value: 127},
        ],
    };

    private index: number;
    private subscription: Subscription;

    constructor() {
        super();
        this.index = 0;
    }

    public _startPreset(): void {
        this.subscription = Actions$.mainBeat.subscribe(() => {
            if(wordSets[this.modifier]) {
                this.index = this.index + 1 % wordSets[this.modifier].length;
                nextActionFromMsg(Actions.singleColor(wordSets[this.modifier][this.index]));
            }
        });
    }

    public _stopPreset(): void {
        if (typeof this.subscription !== 'undefined') this.subscription.unsubscribe();
    }

}

const wordSets = {
    1: ['C', 'A', 'B', 'R', 'I', 'O', 'L', 'E', 'T', 'T', 'A'],
    127: [
        'EINDHOVEN',
        'MAKER',
        'FAIR',
    ],
};
