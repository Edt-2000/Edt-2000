import {Subscription} from 'rxjs/Subscription';
import {noteOn$} from '../../../inputs/midi';
import {PresetLogic} from '../../presets-logic';
import {filter, withLatestFrom} from 'rxjs/operators';
import {modifiers} from '../../../../../Shared/config';
import {Actions, Actions$, nextActionFromMsg} from '../../../../../Shared/actions';

export class MidiToColors extends PresetLogic {
    modifierOptions = {
        select: modifiers.midiChannels,
    };

    private subscription: Subscription;

    protected _startPreset(): void {
        this.subscription = noteOn$.pipe(
            filter((note) => note.channel === this.modifier),
            withLatestFrom(Actions$.multiColor),
        )
            .subscribe(([noteOn, multiColor]) => {
                // TODO: create calculation which takes a color based on note
                nextActionFromMsg(Actions.singleColor(multiColor[multiColor.length % noteOn.note]));
            });
    }

    protected _stopPreset(): void {
        if (typeof this.subscription !== 'undefined') this.subscription.unsubscribe();
    }

}
