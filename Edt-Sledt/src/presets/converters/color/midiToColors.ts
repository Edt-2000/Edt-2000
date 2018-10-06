import {Subscription} from 'rxjs/Subscription';
import {noteOn$} from '../../../inputs/midi';
import {PresetLogic} from '../../presets-logic';
import {filter, withLatestFrom} from 'rxjs/operators';
import {MidiChannels} from '../../../../../Shared/config';
import {Actions, Actions$, nextActionFromMsg} from '../../../../../Shared/actions';

export class MidiToColors extends PresetLogic {
    modifierOptions = {
        select: [
            {label: MidiChannels[MidiChannels.channel_1], value: MidiChannels.channel_1},
            {label: MidiChannels[MidiChannels.channel_2], value: MidiChannels.channel_2},
            {label: MidiChannels[MidiChannels.channel_3], value: MidiChannels.channel_3},
            {label: MidiChannels[MidiChannels.channel_4], value: MidiChannels.channel_4},
            {label: MidiChannels[MidiChannels.channel_5], value: MidiChannels.channel_5},
            {label: MidiChannels[MidiChannels.channel_10], value: MidiChannels.channel_10},
        ],
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
