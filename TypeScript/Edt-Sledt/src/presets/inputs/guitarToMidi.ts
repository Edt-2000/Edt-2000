import { PresetLogic } from '../presets-logic';
import { edtGuitar$ } from '../../inputs/edt-guitar';
import { modifiers } from '../../../config/modifiers';
import { sendToMidiNote } from '../../outputs/edt-midi';
import { Note } from '../../../../Shared/midi/midi';
import { MermaidConfig, ModifierGroup } from '../../../../Shared/actions/types';
import { tap } from 'rxjs';

export class GuitarToMidi extends PresetLogic {
    mermaidConfig: MermaidConfig[];
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
                    sendToMidiNote({
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
            return Note.C2;
        case 2:
            return Note.D$_1;
        case 4:
            return Note.F1;
        case 8:
            return Note.G1;
        case 16:
            return Note.C1;
        default:
            return 0;
    }
}
