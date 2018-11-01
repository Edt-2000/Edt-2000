import {PresetLogic} from '../../presets-logic';
import {BlackColor} from "../../../../../Shared/config";
import {withLatestFrom} from "rxjs/operators";
import {Actions$} from "../../../../../Shared/actions";
import {IColor} from "../../../../../Shared/types";
import {FastLedtSinglePulse} from "../../../outputs/edt-fastled";
import {DrumSounds} from "../../../../../Shared/drums";

export class DrumSoundToFastLedStrip extends PresetLogic {
    modifierOptions = {
        select: [
            {label: 'simple', value: 10},
            {label: 'fromCenter', value: 20},
            {label: 'centralBeat', value: 30},
        ],
    };
    private patterns = {
        10: [
            DrumSounds.kick,
            DrumSounds.snare,
            DrumSounds.kick,
            DrumSounds.snare,
            DrumSounds.kick,
            DrumSounds.snare,
            DrumSounds.kick,
        ],
    };

    protected _startPreset(): void {
        FastLedtSinglePulse(0, 100, BlackColor); // Turn of all strips before starting
        this.addSub(Actions$.mainDrum.pipe(
                withLatestFrom(Actions$.singleColor),
            )
            .subscribe(([drumSound, color]) => {
                if (this.patterns[this.modifier]) this.horizontalCompleteStrips(drumSound, color, this.patterns[this.modifier]);
            }));
    }

    protected _stopPreset(): void {
    }

    private horizontalCompleteStrips(drumSound: DrumSounds, color: IColor, pattern: number[]) {
        pattern.forEach((sound, index) => {
            if (sound === drumSound) FastLedtSinglePulse(index + 1, 50, color);
        });
    }
}
