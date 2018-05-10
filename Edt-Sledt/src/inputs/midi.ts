import {Observable} from 'rxjs/Observable';
import {automationChannel} from '../../../Shared/config';
import {CC$, sledtNoteOff$, sledtNoteOn$} from '../communication/midi';
import {IMidiNoteMsg, IPresetMsg} from '../../../Shared/types';
import {filter, map, merge} from 'rxjs/operators';
import {Note} from '../../../Shared/midi';

export const noteOn$: Observable<IMidiNoteMsg> = sledtNoteOn$.pipe(
    filter((msg) => msg.channel !== automationChannel),
);

export const noteOff$: Observable<IMidiNoteMsg> = sledtNoteOff$.pipe(
    filter((msg) => msg.channel !== automationChannel),
);

const presetOn$: Observable<IPresetMsg> = sledtNoteOn$.pipe(
    filter((msg) => msg.channel === automationChannel),
    map((msg): IPresetMsg => {
        return {
            preset: Note[Note[msg.note]],
            modifier: msg.velocity,
            state: true,
        };
    }),
);

const presetOff$: Observable<IPresetMsg> = sledtNoteOff$.pipe(
    filter((msg) => msg.channel === automationChannel),
    map((msg): IPresetMsg => {
        return {
            preset: Note[Note[msg.note]],
            modifier: msg.velocity,
            state: false,
        };
    }),
);

export const presetMidi$: Observable<IPresetMsg> = presetOn$.pipe(
    merge(presetOff$)
);

export const automationNoteOn$: Observable<IMidiNoteMsg> = sledtNoteOn$.pipe(
    filter((note) => note.channel === automationChannel),
);
export const automationNoteOff$: Observable<IMidiNoteMsg> = sledtNoteOff$.pipe(
    filter((note) => note.channel === automationChannel),
);

export const automationCC$ = CC$.pipe(
    filter(cc => cc.channel === automationChannel),
);
