import {Subscription} from 'rxjs/Subscription';
import {PresetLogic} from '../../presets-logic';
import {IModifierOptions} from '../../../../../Shared/types';
import {Note} from '../../../../../Shared/midi';
import {drumTriggerOn$} from "../../../inputs/music-triggers";
import {DrumNotes, fastLedAmount} from "../../../../../Shared/config";
import {FastLedtSinglePulse} from "../../../outputs/edt-fastled";
import {withLatestFrom} from "rxjs/operators";
import {Actions$} from "../../../../../Shared/actions";
import {IColor} from "../../../../../Shared/socket";

export class DrumsToFastLedStrip extends PresetLogic {
    title = 'DrumsToFastLedStrip';
    note = Note.B1;

    modifierOptions: IModifierOptions = {
        select: [
            {label: 'HorizontalCompleteStrips', value: 10},
            {label: 'VerticalChunks', value: 20},
            {label: 'VerticalMixedChunks', value: 30},
        ],
    };

    private subscriber: Subscription;

    public _startPreset(): void {
        this.subscriber = drumTriggerOn$
            .pipe(
                withLatestFrom(Actions$.singleColor),
            )
            .subscribe(([drumNote, color]) => {

                switch (this.modifier) {
                    case this.modifierOptions.select[0].value:
                        this.horizontalCompleteStrips(drumNote, {h: 0, s:254, b: 254});
                        break;

                    case this.modifierOptions.select[1].value:

                        break;

                    case this.modifierOptions.select[2].value:

                        break;
                }
                // FastLedtSingleSolid()
            });
    }

    public _stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
        }
    }

    private horizontalCompleteStrips(drumNote: DrumNotes, color: IColor) {
        let flashPattern = getFlashPattern();

        flashPattern.forEach((note, index) => {
            if (note === drumNote) FastLedtSinglePulse(index + 1, 63, color);
        });
    }

}

function getFlashPattern() {
// Group into three, with KICK center + outsides if possible
    // K - - K - - K
    if (fastLedAmount === 3) {
        return [
            DrumNotes._2,
            DrumNotes._1,
            DrumNotes._2,
        ];
    }

    if (fastLedAmount === 5) {
        return [
            DrumNotes._1,
            DrumNotes._2,
            DrumNotes._1,
            DrumNotes._2,
            DrumNotes._1,
        ];
    }

    return [
        DrumNotes._1,
        DrumNotes._2,
        DrumNotes._3,
        DrumNotes._4,
        DrumNotes._5,
        DrumNotes._6A,
        DrumNotes._6B,
    ];
}
