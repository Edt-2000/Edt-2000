import {Subscription} from 'rxjs/Subscription';
import {sendToVidt} from '../../outputs/edt-vidt';
import {IIntensityMsg} from '../../../../Shared/socket';
import {PresetLogic} from '../presets-logic';
import {BeatMain} from '../../subjects/triggers';
import {IModifierOptions} from '../../../../Shared/types';
import {Note} from '../../../../Shared/midi';

export class BeatToVidtBounce extends PresetLogic {
    title = 'Beat To Vidt Bounce';
    note = Note.C_1;

    modifierOptions: IModifierOptions = {
        type: 'none',
    };

    private subscriber: Subscription;

    public _startPreset(): void {
        this.subscriber = BeatMain
            .subscribe((note) => {
                sendToVidt({
                    intensity: 100
                } as IIntensityMsg)
            });
    }

    public _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
        }
    }

}
