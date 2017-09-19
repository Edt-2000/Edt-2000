'use strict';
import {Subject} from 'rxjs/Subject';
import {colorMsg} from '../../../SharedTypes/socket';

export const EdtMainColor: Subject<colorMsg> = new Subject();

// EdtMainColor.subscribe((msg) => {
//     console.log('Color change:', msg);
// });
