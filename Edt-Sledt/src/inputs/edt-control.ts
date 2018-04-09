import {ctrlSocketIn$} from '../communication/sockets';
import {filter, map} from 'rxjs/operators';
import {PRESET_OFF, PRESET_ON} from '../../../Shared/actions';

export const presetCtrlOn$ = ctrlSocketIn$.pipe(
    filter(action => action.type === PRESET_ON),
    map(action => action.payload),
);

export const presetCtrlOff$ = ctrlSocketIn$.pipe(
    filter(action => action.type === PRESET_OFF),
    map(action => action.payload),

);
