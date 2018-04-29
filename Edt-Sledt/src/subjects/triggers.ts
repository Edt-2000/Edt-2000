import {Subject} from 'rxjs/Subject';
import {Actions$} from '../../../Shared/actions';
import {merge} from 'rxjs/operators';

export const BeatMain: Subject<number> = new Subject();

export const BeatMain$ = BeatMain.asObservable().pipe(merge(Actions$.mainBeat));
