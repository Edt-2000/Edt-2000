'use strict';
import {Subject} from 'rxjs/Subject';
import {colorMsg} from '../../SharedTypes/socket';

export const EdtVidtColor: Subject<colorMsg> = new Subject();