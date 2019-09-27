import { PresetLogic } from '../presets-logic';
import { tap } from 'rxjs/operators';
import { ModifierGroup } from '../../../../Shared/helpers/types';
import { edtGuitar$ } from '../../inputs/edt-guitar';
import { modifiers } from '../../../../Shared/modifiers';
import { sendToMidi } from '../../outputs/edt-midi';
import { Note } from '../../../../Shared/helpers/midi';

export class GuitarToMidi extends PresetLogic {
    modifierOptions = {
        select: modifiers.midiChannels,
        group: [
            ModifierGroup.EdtGuitar,
        ],
    };

    protected _startPreset(): void {
        this.addSub(
            edtGuitar$.pipe(
                tap((bitMask: number) => {
                    sendToMidi({
                        channel: this.modifier,
                        note: bitMaskToNote(bitMask),
                        noteOn: bitMask !== 0,
                        velocity: bitMask === 0 ? 0 : 127,
                    });
                }),
            ).subscribe(),
        );
    }

    protected _stopPreset(): void {
    }
}

function bitMaskToNote(bitMask: number) {
    switch (bitMask) {
        case 1:
            return Note.C1;
        case 2:
            return Note.D$_1;
        case 4:
            return Note.F1;
        case 8:
            return Note.G1;
        case 16:
            return Note.C2;
        default:
            return 0;
    }
}
