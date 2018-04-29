import {Subscription} from 'rxjs/Subscription';
import {PresetLogic} from '../../presets-logic';
import {BeatMain} from '../../../subjects/triggers';
import {IModifierOptions} from '../../../../../Shared/types';
import {Note} from '../../../../../Shared/midi';

export class BeatToVidtBounce extends PresetLogic {
    title = 'Beat To Vidt Bounce';
    note = Note.C_1;

    modifierOptions: IModifierOptions = {
        type: 'continuous',
    };

    private subscriber: Subscription;

    public _startPreset(): void {
        this.subscriber = BeatMain
            .subscribe((note) => {

            });
    }

    public _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
        }
    }

}
