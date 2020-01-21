import { PresetLogic } from '../../presets-logic';
import { modifiers } from '../../../../config/modifiers';
import { filter } from 'rxjs/operators';
import { Actions, Actions$, nextActionFromMsg } from '../../../../../Shared/actions/actions';
import { ModifierGroup } from '../../../../../Shared/actions/types';
import { DrumSounds } from '../../../../config/config';

export class DrumSoundMap extends PresetLogic {
    modifierOptions = {
        select: modifiers.drumNotes,
        group: [
            ModifierGroup.Drums,
        ],
    };

    constructor(public sound: DrumSounds) {
        super();
        this.title = 'DrumTo-' + DrumSounds[this.sound];
    }

    protected _startPreset(): void {
        this.addSub(
            Actions$.mainDrum
                .pipe(filter(drumNote => this.modifier === drumNote.note))
                .subscribe(() => {
                    nextActionFromMsg(Actions.mainDrumSound(this.sound));
                }),
        );
    }

    protected _stopPreset(): void {
    }
}
