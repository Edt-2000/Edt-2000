import {Subscription} from 'rxjs/Subscription';
import {IColor} from '../../../../../Shared/socket';
import {noteOn$} from '../../../inputs/midi';
import {shuffleArray} from '../../../../../Shared/utils';
import {PresetLogic} from '../../presets-logic';
import {filter} from 'rxjs/operators';
import {IModifierOptions} from '../../../../../Shared/types';
import {MidiChannels} from '../../../../../Shared/config';
import {Note} from '../../../../../Shared/midi';
import {Actions, nextActionFromMsg} from '../../../../../Shared/actions';

export class MidiToColors extends PresetLogic {
    title: string = 'Midi To Colors';
    note = Note.D_2;

    modifierOptions: IModifierOptions = {
        type: 'select',
        select: [
            {label: MidiChannels[MidiChannels.synth], value: MidiChannels.synth},
            {label: MidiChannels[MidiChannels.bass], value: MidiChannels.bass},
            {label: MidiChannels[MidiChannels.melody], value: MidiChannels.melody},
            {label: MidiChannels[MidiChannels.drum], value: MidiChannels.drum},
        ],
    };

    private hue: number;
    private subscription: Subscription;

    private hues: number[];

    constructor() {
        super();
        this.hue = 0;

        this.hues = shuffleArray([
            0, 18, 58, 85, 95, 105, 129, 158, 183, 218,
            // TODO: find 2 more colors to make a palette of 12
            218, 218,
        ]);
    }

    public _startPreset(): void {

        this.subscription = noteOn$.pipe(
            filter((note) => note.channel === this.modifier),
        )
            .subscribe((note) => {
                const newColor: IColor = {
                    hue: this.hues[note.noteNumber - 1],
                    saturation: 255,
                    brightness: 255,
                };
                nextActionFromMsg(Actions.singleColor(newColor));
            });
    }

    public _stopPreset(): void {
        if (typeof this.subscription !== 'undefined') this.subscription.unsubscribe();
    }

}
