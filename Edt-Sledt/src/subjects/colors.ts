'use strict';
import {Subject} from 'rxjs/Subject';
import {IColor} from '../../../SharedTypes/socket';

export const EdtMainColor: Subject<IColor> = new Subject();

// EdtMainColor.subscribe((msg) => {
//     console.log('Color change:', msg);
// });
