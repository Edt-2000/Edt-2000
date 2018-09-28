import {Subscription} from 'rxjs/Subscription';
import {PresetLogic} from '../../presets-logic';
import {IModifierOptions} from '../../../../../Shared/types';
import {Note} from '../../../../../Shared/midi';
import {drumTriggerOn$} from "../../../inputs/music-triggers";
import {DrumNotes} from "../../../../../Shared/config";
import {FastLedtSinglePulse} from "../../../outputs/edt-fastled";
import {withLatestFrom} from "rxjs/operators";
import {Actions$} from "../../../../../Shared/actions";
import {IColor} from "../../../../../Shared/socket";

export class DrumsToFastLedStrip extends PresetLogic {
    title = 'DrumsToFastLedStrip';
    note = Note.B1;

    modifierOptions: IModifierOptions = {
        select: [
            {label: 'simple', value: 10},
            {label: 'fromCenter', value: 20},
        ],
    };

    private subscriber: Subscription;

    public _startPreset(): void {
        this.subscriber = drumTriggerOn$
            .pipe(
                withLatestFrom(Actions$.singleColor),
            )
            .subscribe(([drumNote, color]) => {
                this.horizontalCompleteStrips(drumNote, color, patterns[this.modifier]);
            });
    }

    public _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
        }
    }

    private horizontalCompleteStrips(drumNote: DrumNotes, color: IColor, pattern: number[]) {
        pattern.forEach((note, index) => {
            if (note === drumNote) FastLedtSinglePulse(index + 1, 50, color);
        });
    }

}

const patterns = {
    10: [
        DrumNotes._1,
        DrumNotes._2,
        DrumNotes._3,
        DrumNotes._4,
        DrumNotes._5,
        DrumNotes._6A,
        DrumNotes._6B,
    ],

    20: [
        DrumNotes._6A,
        DrumNotes._3,
        DrumNotes._2,
        DrumNotes._1,
        DrumNotes._2,
        DrumNotes._3,
        DrumNotes._6A,
    ],

};
