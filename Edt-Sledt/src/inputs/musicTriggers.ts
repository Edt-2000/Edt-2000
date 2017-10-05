import {Observable} from 'rxjs/Observable';
import {noteOn} from './midi';
import {drumChannel} from '../../../SharedTypes/config';

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
    '_7B' = 51
}

export const DrumTrigger: Observable<DrumNotes> = noteOn
    .filter((msg) => msg.channel === drumChannel && msg.note in DrumNotes)
    .map((msg) => DrumNotes[DrumNotes[msg.note]]);







