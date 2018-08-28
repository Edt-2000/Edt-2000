import {Subscription} from 'rxjs/Subscription';
import {PresetLogic} from '../../presets-logic';
import {IModifierOptions} from '../../../../../Shared/types';
import {Note} from '../../../../../Shared/midi';
import {Actions$} from '../../../../../Shared/actions';
import {FastLedtSingleSolid} from '../../../outputs/edt-fastled';

export class ColorToFastLedSolid extends PresetLogic {
    title = 'ColorToFastLedSolid';
    note = Note.A$2;

    modifierOptions: IModifierOptions = {};

    private subscriber: Subscription;

    public _startPreset(): void {
        this.subscriber = Actions$.singleColor.subscribe((color) => {
            FastLedtSingleSolid(0, color);
        });
    }

    public _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
        }
    }

}
