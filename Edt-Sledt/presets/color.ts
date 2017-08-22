'use strict';
import {Subject} from 'rxjs/Subject';
import {colorMsg} from '../../SharedTypes/socket';

export const EdtColor: Subject<colorMsg> = new Subject();