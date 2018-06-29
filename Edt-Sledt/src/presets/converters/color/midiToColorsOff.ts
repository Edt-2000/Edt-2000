import {Subscription} from 'rxjs/Subscription';
import {IColor} from '../../../../../Shared/socket';
import {
    noteOff$,
    noteOn$,
} from '../../../inputs/midi';
import {shuffleArray} from '../../../../../Shared/utils';
import {PresetLogic} from '../../presets-logic';
import {filter} from 'rxjs/operators';
import {IModifierOptions} from '../../../../../Shared/types';
import {MidiChannels} from '../../../../../Shared/config';
import {Note} from '../../../../../Shared/midi';
import {Actions, nextActionFromMsg} from '../../../../../Shared/actions';

export class MidiToColorsOff extends PresetLogic {
    title: string = 'Midi To Colors Off';
    note = Note.D$3;

    modifierOptions: IModifierOptions = {
        select: [
            {label: MidiChannels[MidiChannels.channel_1], value: MidiChannels.channel_1},
            {label: MidiChannels[MidiChannels.channel_2], value: MidiChannels.channel_2},
            {label: MidiChannels[MidiChannels.channel_3], value: MidiChannels.channel_3},
            {label: MidiChannels[MidiChannels.channel_4], value: MidiChannels.channel_4},
            {label: MidiChannels[MidiChannels.channel_5], value: MidiChannels.channel_5},
        ],
    };

    private hue: number;
    private subscription: Subscription;

    private hues: number[];

    constructor() {
        super();
        this.hue = 0;

        this.hues = shuffleArray([
            0, 18, 48, 58, 85, 95, 105, 129, 158, 183, 200, 218, // nice colors?
        ]);
    }

    public _startPreset(): void {
        this.subscription = noteOff$.pipe(
            filter((note) => note.channel === this.modifier),
        )
            .subscribe((note) => {
                const newColor: IColor = {
                    hue: this.hues[note.noteNumber - 1],
                    saturation: 0,
                    brightness: 0,
                };
                nextActionFromMsg(Actions.singleColor(newColor));
            });
    }

    public _stopPreset(): void {
        if (typeof this.subscription !== 'undefined') this.subscription.unsubscribe();
    }

}
