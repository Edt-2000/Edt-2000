import {PresetLogic} from '../../presets-logic';
import {drumTriggerOn$} from "../../../inputs/music-triggers";
import {BlackColor, DrumNotes} from "../../../../../Shared/config";
import {withLatestFrom} from "rxjs/operators";
import {Actions$} from "../../../../../Shared/actions";
import {IColor} from "../../../../../Shared/types";
import {FastLedtSinglePulse} from "../../../outputs/edt-fastled";

export class DrumsToFastLedStrip extends PresetLogic {
    modifierOptions = {
        select: [
            {label: 'simple', value: 10},
            {label: 'fromCenter', value: 20},
            {label: 'centralBeat', value: 30},
        ],
    };

    protected _startPreset(): void {
        FastLedtSinglePulse(0, 100, BlackColor); // Turn of all strips before starting
        this.addSub(drumTriggerOn$
            .pipe(
                withLatestFrom(Actions$.singleColor),
            )
            .subscribe(([drumNote, color]) => {
                if (this.patterns[this.modifier]) this.horizontalCompleteStrips(drumNote, color, this.patterns[this.modifier]);
            }));
    }

    protected _stopPreset(): void {
    }

    private horizontalCompleteStrips(drumNote: DrumNotes, color: IColor, pattern: number[]) {
        pattern.forEach((note, index) => {
            if (note === drumNote) FastLedtSinglePulse(index + 1, 50, color);
        });
    }

    private patterns = {
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
            DrumNotes._6A,
            DrumNotes._2,
            DrumNotes._3,
            DrumNotes._6A,
        ],

        30: [
            DrumNotes._1,
            DrumNotes._2,
            DrumNotes._6A,
            DrumNotes._1,
            DrumNotes._6A,
            DrumNotes._2,
            DrumNotes._1,
        ],
    }
}
