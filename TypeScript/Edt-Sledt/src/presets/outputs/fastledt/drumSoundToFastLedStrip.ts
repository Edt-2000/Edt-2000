import { PresetLogic } from '../../presets-logic';
import { BlackColor } from '../../../../../Shared/config';
import { withLatestFrom } from 'rxjs/operators';
import { Actions$ } from '../../../../../Shared/actions';
import { ModifierGroup } from '../../../../../Shared/types';
import { FastLedtSinglePulse } from '../../../outputs/edt-fastled';
import { DrumSounds } from '../../../../../Shared/drums';

export class DrumSoundToFastLedStrip extends PresetLogic {
    modifierOptions = {
        group: ModifierGroup.FastLED,
    };

    protected _startPreset(): void {
        FastLedtSinglePulse(0, 100, BlackColor); // Turn of all strips before starting

        this.addSub(
            Actions$.mainDrumSound
                .pipe(withLatestFrom(Actions$.singleColor))
                .subscribe(([drumSound, color]) => {
                    [
                        DrumSounds.kick,
                        DrumSounds.snare,
                        DrumSounds.kick,
                        DrumSounds.snare,
                        DrumSounds.kick,
                        DrumSounds.snare,
                        DrumSounds.kick,
                    ].forEach((sound, index) => {
                        if (sound === drumSound) {
                            FastLedtSinglePulse(index + 1, 50, color);
                        }
                    });
                }),
        );
    }

    protected _stopPreset(): void {
    }
}
