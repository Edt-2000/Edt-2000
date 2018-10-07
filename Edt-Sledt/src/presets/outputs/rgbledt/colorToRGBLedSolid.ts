import {Subscription} from 'rxjs/Subscription';
import {PresetLogic} from '../../presets-logic';
import {Actions$} from '../../../../../Shared/actions';
import {RGBLedtSingleSolid} from "../../../outputs/edt-rgbledt";
import {skip} from "rxjs/operators";

export class ColorToRGBLedSolid extends PresetLogic {
    private subscriber: Subscription;

    protected _startPreset(): void {
        this.subscriber = Actions$.singleColor.pipe(
            skip(1),
        ).subscribe((color) => {
            RGBLedtSingleSolid(0, color);
        });
    }

    protected _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
        }
    }
}
