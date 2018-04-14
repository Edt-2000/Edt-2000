import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import {Actions} from '../../../Shared/actions';
import {io} from '../communication/sockets';
import {presetMap} from '../presets/presets-logic';

export const ctrlSocketIn$ = new BehaviorSubject({} as Actions);
export const ctrlSocketOut$: Subject<Actions> = new Subject();

export function sendStateToControl() {
    const currentState = Array.from(presetMap)
        .map(([presetNr, preset]) => {
            return {
                active: preset.active,
                title: preset.title,
            }
        });
    ctrlSocketOut$.next(Actions.presetState(currentState));
}

ctrlSocketOut$.subscribe(msg => {
    io.emit('toControl', msg);
});
