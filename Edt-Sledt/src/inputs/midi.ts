import {Observable} from 'rxjs/Observable';
import {adjustmentChannel, presetMsgChannel} from '../../../SharedTypes/config';
import {sledtNoteOff$, sledtNoteOn$} from '../communication/midi';
import {IMidiNoteMsg, IPresetMsg} from '../types';
import {filter, map, merge} from 'rxjs/operators';

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
            preset: msg.note,
            modifier: msg.velocity,
            state: true,
        };
    }),
);

const presetOff$: Observable<IPresetMsg> = sledtNoteOff$.pipe(
    filter((msg) => msg.channel === presetMsgChannel),
    map((msg): IPresetMsg => {
        return {
            preset: msg.note,
            modifier: msg.velocity,
            state: false,
        };
    }),
);

export const presetMidi$: Observable<IPresetMsg> = presetOn$.pipe(
    merge(presetOff$)
);



// Loggers, comment to disable
// noteOn$.subscribe((msg) => console.log('NoteOn', msg));
// noteOff$.subscribe((msg) => console.log('NoteOff', msg));
// Program.subscribe((msg) => console.log('Program', msg));
// Select.subscribe((msg) => console.log('Select', msg));
// CC.subscribe((msg) => console.log('CC', msg));

export enum Note {
    'C0',
    'C_0',
    'D0',
    'D_0',
    'E0',
    'F0',
    'F_0',
    'G0',
    'G_0',
    'A0',
    'A_0',
    'B0',
    'C1',
    'C_1',
    'D1',
    'D_1',
    'E1',
    'F1',
    'F_1',
    'G1',
    'G_1',
    'A1',
    'A_1',
    'B1',
    'C2',
    'C_2',
    'D2',
    'D_2',
    'E2',
    'F2',
    'F_2',
    'G2',
    'G_2',
    'A2',
    'A_2',
    'B2',
    'C3',
    'C_3',
    'D3',
    'D_3',
    'E3',
    'F3',
    'F_3',
    'G3',
    'G_3',
    'A3',
    'A_3',
    'B3',
    'C4',
    'C_4',
    'D4',
    'D_4',
    'E4',
    'F4',
    'F_4',
    'G4',
    'G_4',
    'A4',
    'A_4',
    'B4',
    'C5',
    'C_5',
    'D5',
    'D_5',
    'E5',
    'F5',
    'F_5',
    'G5',
    'G_5',
    'A5',
    'A_5',
    'B5',
    'C6',
    'C_6',
    'D6',
    'D_6',
    'E6',
    'F6',
    'F_6',
    'G6',
    'G_6',
    'A6',
    'A_6',
    'B6',
    'C7',
    'C_7',
    'D7',
    'D_7',
    'E7',
    'F7',
    'F_7',
    'G7',
    'G_7',
    'A7',
    'A_7',
    'B7'
}
