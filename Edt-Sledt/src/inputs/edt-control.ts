import {filter, map} from 'rxjs/operators';
import {PRESET_OFF, PRESET_ON} from '../../../Shared/actions';
import {ctrlSocketIn$} from '../outputs/edt-control';

export const presetCtrlOn$ = ctrlSocketIn$.pipe(
    filter(action => action.type === PRESET_ON),
    map(action => action.payload),
);

export const presetCtrlOff$ = ctrlSocketIn$.pipe(
    filter(action => action.type === PRESET_OFF),
    map(action => action.payload),

);
