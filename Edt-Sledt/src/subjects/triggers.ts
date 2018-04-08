'use strict';
import {Subject} from 'rxjs/Subject';

export const BeatMain = new Subject();

BeatMain.subscribe((note) => {
    console.log('beat');
});
