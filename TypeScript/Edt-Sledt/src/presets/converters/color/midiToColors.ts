import { musicNoteOn$ } from '../../../communication/midi';
import { PresetLogic } from '../../presets-logic';
import { filter, withLatestFrom } from 'rxjs/operators';
import { modifiers } from '../../../../../Shared/modifiers';
import { Actions, Actions$, nextActionFromMsg } from '../../../../../Shared/actions';
import { ModifierGroup } from '../../../../../Shared/types';

export class MidiToColors extends PresetLogic {
    modifierOptions = {
        select: modifiers.midiChannels,
        group: [
            ModifierGroup.Color,
            ModifierGroup.Midi,
        ],
    };

    protected _startPreset(): void {
        this.addSub(
            musicNoteOn$
                .pipe(
                    filter(note => note.channel === this.modifier),
                    withLatestFrom(Actions$.colorPalette),
                )
                .subscribe(([noteOn, colorPalette]) => {
                    nextActionFromMsg(
                        Actions.singleColor(
                            colorPalette[noteOn.note % colorPalette.length],
                        ),
                    );
                }),
        );
    }

    protected _stopPreset(): void {
    }
}
