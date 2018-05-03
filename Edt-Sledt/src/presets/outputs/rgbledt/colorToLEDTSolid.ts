import {Subscription} from 'rxjs/Subscription';
import {PresetLogic} from '../../presets-logic';
import {IModifierOptions} from '../../../../../Shared/types';
import {Note} from '../../../../../Shared/midi';
import {mainColor$} from '../../../subjects/colors';
import {EdtSingleSolid} from '../../../outputs/edt-dispedter';

export class ColorToLEDTSolid extends PresetLogic {
    title = 'ColorToKittSimple';
    note = Note.A$2;

    modifierOptions: IModifierOptions = {
        type: 'none',
    };

    private subscriber: Subscription;

    public _startPreset(): void {
        this.subscriber = mainColor$.subscribe((color) => {
            EdtSingleSolid(0, color);
        });
    }

    public _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
        }
    }

}
