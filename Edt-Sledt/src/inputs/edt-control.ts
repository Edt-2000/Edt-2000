import {filter, map} from 'rxjs/operators';
import {PRESET_CHANGE} from '../../../Shared/actions';
import {ctrlSocketIn$} from '../outputs/edt-control';
import {Observable} from 'rxjs/Observable';

export const presetCtrlChange$: Observable<any> = ctrlSocketIn$.pipe(
    filter(action => action.type === PRESET_CHANGE),
    map(action => action.payload),
);
