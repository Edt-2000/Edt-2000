import {Subscription} from 'rxjs/Subscription';
import {PresetLogic} from '../../presets-logic';
import {IModifierOptions} from '../../../../../Shared/types';
import {Note} from '../../../../../Shared/midi';
import {Actions$} from '../../../../../Shared/actions';
import {RGBLedtSingleSolid} from "../../../outputs/edt-rgbledt";

export class ColorToRGBLedSolid extends PresetLogic {
    title = 'ColorToRGBLedSolid';
    note = Note.A2;

    modifierOptions: IModifierOptions = {};

    private subscriber: Subscription;

    public _startPreset(): void {
        this.subscriber = Actions$.singleColor.subscribe((color) => {
            RGBLedtSingleSolid(0, color);
        });
    }

    public _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
        }
    }

}
