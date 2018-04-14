import {filter, map, tap} from 'rxjs/operators';
import {PRESET_CHANGE} from '../../../Shared/actions';
import {ctrlSocketIn$} from '../outputs/edt-control';
import {IPresetMsg} from '../../../Shared/types';
import {Observable} from 'rxjs/Observable';

export const presetCtrlChange$: Observable<IPresetMsg> = ctrlSocketIn$.pipe(
    filter(action => action.type === PRESET_CHANGE),
    map(action => action.payload),
);
