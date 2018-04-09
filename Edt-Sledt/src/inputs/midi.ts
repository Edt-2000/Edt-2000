import {Observable} from 'rxjs/Observable';
import {adjustmentChannel, presetMsgChannel} from '../../../Shared/config';
import {sledtNoteOff$, sledtNoteOn$} from '../communication/midi';
import {IMidiNoteMsg, IPresetMsg} from '../../../Shared/types';
import {filter, map, merge} from 'rxjs/operators';
import {Note} from '../../../Shared/midi';

export const noteOn$: Observable<IMidiNoteMsg> = sledtNoteOn$.pipe(
    filter((msg) => msg.channel !== presetMsgChannel || msg.channel !== adjustmentChannel),
);
export const noteOff$: Observable<IMidiNoteMsg> = sledtNoteOff$.pipe(
    filter((msg) => msg.channel !== presetMsgChannel || msg.channel !== adjustmentChannel),
);

export const adjustmentNoteOn$: Observable<IMidiNoteMsg> = sledtNoteOn$.pipe(
    filter((msg) => msg.channel === adjustmentChannel),
);
export const adjustmentNoteOff$: Observable<IMidiNoteMsg> = sledtNoteOff$.pipe(
    filter((msg) => msg.channel === adjustmentChannel),
);

const presetOn$: Observable<IPresetMsg> = sledtNoteOn$.pipe(
    filter((msg) => msg.channel === presetMsgChannel),
    map((msg): IPresetMsg => {
        return {
            preset: Note[Note[msg.note]],
            modifier: msg.velocity,
            state: true,
        };
    }),
);

const presetOff$: Observable<IPresetMsg> = sledtNoteOff$.pipe(
    filter((msg) => msg.channel === presetMsgChannel),
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


// Loggers, comment to disable

// presetOn$.subscribe((msg) => console.log('PresetOn', msg));
// noteOn$.subscribe((msg) => console.log('NoteOn', msg));
// noteOff$.subscribe((msg) => console.log('NoteOff', msg));
// Program$.subscribe((msg) => console.log('Program', msg));
// Select$.subscribe((msg) => console.log('Select', msg));
// CC$.subscribe((msg) => console.log('CC', msg));

