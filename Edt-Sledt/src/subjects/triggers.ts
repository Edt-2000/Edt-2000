'use strict';
import {Subject} from 'rxjs/Subject';
import {DrumNotes} from '../inputs/musicTriggers';

export const BeatMain: Subject<number> = new Subject();

BeatMain.subscribe((note) => {
    console.log('beat', DrumNotes[note]);
});
