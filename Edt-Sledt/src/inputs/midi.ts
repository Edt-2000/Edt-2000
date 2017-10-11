import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/share';
import {Observable} from 'rxjs/Observable';
import {adjustmentChannel, presetMsgChannel} from '../../../SharedTypes/config';
import {sledtNoteOff$, sledtNoteOn$} from '../communication/midi';
import {IMidiNoteMsg, IPresetMsg} from '../types';

export const noteOn$: Observable<IMidiNoteMsg> = sledtNoteOn$.filter((msg) => msg.channel !== presetMsgChannel || msg.channel !== adjustmentChannel);
export const noteOff$: Observable<IMidiNoteMsg> = sledtNoteOff$.filter((msg) => msg.channel !== presetMsgChannel || msg.channel !== adjustmentChannel);

export const adjustmentNoteOn$: Observable<IMidiNoteMsg> = sledtNoteOn$.filter((msg) => msg.channel === adjustmentChannel);
export const adjustmentNoteOff$: Observable<IMidiNoteMsg> = sledtNoteOff$.filter((msg) => msg.channel === adjustmentChannel);

const presetOn$: Observable<IPresetMsg> = sledtNoteOn$
    .filter((msg) => msg.channel === presetMsgChannel)
    .map((msg): IPresetMsg => {
        return {
            preset: msg.note,
            modifier: msg.velocity,
            state: true,
        };
    });

const presetOff$: Observable<IPresetMsg> = sledtNoteOff$
    .filter((msg) => msg.channel === presetMsgChannel)
    .map((msg): IPresetMsg => {
        return {
            preset: msg.note,
            modifier: msg.velocity,
            state: false,
        };
    });

export const presetMidi$: Observable<IPresetMsg> = presetOn$.merge(presetOff$);

// Loggers, comment to disable
// noteOn$.subscribe((msg) => console.log('NoteOn', msg));
// noteOff$.subscribe((msg) => console.log('NoteOff', msg));
// Program.subscribe((msg) => console.log('Program', msg));
// Select.subscribe((msg) => console.log('Select', msg));
// CC.subscribe((msg) => console.log('CC', msg));
