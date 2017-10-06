'use strict';
import {Subject} from 'rxjs/Subject';

export const BeatMain: Subject<number> = new Subject();

BeatMain.subscribe((note) => {
    console.log(note);
});
