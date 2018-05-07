import {Subscription} from 'rxjs/Subscription';
import {PresetLogic} from '../../presets-logic';
import {IModifierOptions} from '../../../../../Shared/types';
import {Note} from '../../../../../Shared/midi';
import {EdtSingleSolid} from '../../../outputs/edt-dispedter';
import {Actions$} from '../../../../../Shared/actions';

export class ColorToLEDTSolid extends PresetLogic {
    title = 'ColorToKittSimple';
    note = Note.A$2;

    modifierOptions: IModifierOptions = {};

    private subscriber: Subscription;

    public _startPreset(): void {
        this.subscriber = Actions$.singleColor.subscribe((color) => {
            EdtSingleSolid(0, color);
        });
    }

    public _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
        }
    }

}
