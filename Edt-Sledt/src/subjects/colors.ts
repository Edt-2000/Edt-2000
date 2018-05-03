import {IColor} from '../../../Shared/socket';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Actions$} from '../../../Shared/actions';
import {merge} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';

export const mainColor = new BehaviorSubject({
    hue: 0,
    saturation: 0,
    brightness: 0,
} as IColor);

export const mainColor$: Observable<IColor> = mainColor.asObservable().pipe(merge(Actions$.singleColor));
