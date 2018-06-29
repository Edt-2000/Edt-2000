import {Subscription} from 'rxjs/Subscription';
import {PresetLogic} from '../../presets-logic';
import {IModifierOptions} from '../../../../../Shared/types';
import {Note} from '../../../../../Shared/midi';
import {FastLedtStrobo} from '../../../outputs/edt-fastled';
import {Actions$} from '../../../../../Shared/actions';

export class StroboAll extends PresetLogic {
    title = 'StroboAll';
    note = Note.A$7;

    modifierOptions: IModifierOptions = {};

    private subscriber: Subscription;

    public _startPreset(): void {
        this.subscriber = Actions$.singleColor.subscribe(({hue}) => {
            console.log('strob0', hue);
            FastLedtStrobo(0, hue, 20);
        });
    }

    public _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
            FastLedtStrobo(0, 0, 0);
        }
    }

}
