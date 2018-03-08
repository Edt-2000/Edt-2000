import {Observable} from 'rxjs/Observable';
import {drumChannel} from '../../../SharedTypes/config';
import {IMidiNoteMsg} from '../types';
import {noteOff$, noteOn$} from './midi';
import {filter, map, merge} from 'rxjs/operators';

// The drum notes are mapped by the KORG to the following note numbers
export enum DrumNotes {
    '_1' = 36,
    '_2' = 38,
    '_3' = 40,
    '_4' = 41,
    '_5' = 43,
    '_6A' = 42,
    '_6B' = 46,
    '_7A' = 49,
    '_7B' = 51,
}

const drumTriggerOnOff$: Observable<IMidiNoteMsg> = noteOn$
    .pipe(
        merge(noteOff$),
        filter((msg) => msg.channel === drumChannel && msg.note in DrumNotes),
    );

export const drumTriggerOn$: Observable<DrumNotes> = drumTriggerOnOff$
    .pipe(
        filter((msg) => msg.noteOn),
        map((msg) => DrumNotes[DrumNotes[msg.note]])
    );

export const DrumTriggerOff$: Observable<DrumNotes> = drumTriggerOnOff$
    .pipe(
        filter((msg) => !msg.noteOn),
        map((msg) => DrumNotes[DrumNotes[msg.note]])
    );
