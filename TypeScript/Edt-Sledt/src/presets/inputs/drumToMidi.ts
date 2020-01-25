import { PresetLogic } from '../presets-logic';
import { modifiers } from '../../../config/modifiers';
import { filter, tap } from 'rxjs/operators';
import { edtDrum$ } from '../../inputs/edt-drum';
import { sendToMidiNote } from '../../outputs/edt-midi';
import { ModifierGroup } from '../../../../Shared/actions/types';

export class DrumToMidi extends PresetLogic {
    modifierOptions = {
        select: modifiers.drumNotes,
        group: [
            ModifierGroup.EdtDrums,
        ],
    };

    constructor(public drumPad: number) {
        super();
        this.title = 'DrumPad_' + drumPad + '_ToMidi';
    }

    protected _startPreset(): void {
        this.addSub(
            edtDrum$.pipe(
                filter(drumNote => drumNote === this.drumPad),
                tap(() => {
                    // TODO: Don't hardcode midi channel for drums!
                    sendToMidiNote({
                        channel: 10,
                        note: this.modifier,
                        noteOn: true,
                        velocity: 127,
                    });
                    setTimeout(() => {
                        // TODO: Don't hardcode midi channel for drums!
                        sendToMidiNote({
                            channel: 10,
                            note: this.modifier,
                            noteOn: true,
                            velocity: 0,
                        });
                    }, 20);
                }),
            ).subscribe(),
        );
    }

    protected _stopPreset(): void {
    }
}
