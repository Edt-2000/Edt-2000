import {noteOn$} from '../../../inputs/midi';
import {PresetLogic} from '../../presets-logic';
import {filter, withLatestFrom} from 'rxjs/operators';
import {modifiers} from '../../../../../Shared/modifiers';
import {Actions, Actions$, nextActionFromMsg} from '../../../../../Shared/actions';

export class MidiToColors extends PresetLogic {
    modifierOptions = {
        select: modifiers.midiChannels,
    };

    protected _startPreset(): void {
        this.addSub(noteOn$.pipe(
            filter((note) => note.channel === this.modifier),
            withLatestFrom(Actions$.multiColor),
        )
            .subscribe(([noteOn, multiColor]) => {
                nextActionFromMsg(Actions.singleColor(multiColor[noteOn.note % multiColor.length]));
            }));
    }

    protected _stopPreset(): void {
    }

}
