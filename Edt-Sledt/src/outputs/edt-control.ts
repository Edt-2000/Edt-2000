import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import {Actions} from '../../../Shared/actions';
import {io} from '../communication/sockets';
import {presetMap} from '../presets/presets-logic';
import {IControlPresetMsg} from '../../../Shared/types';
import {interval} from 'rxjs/observable/interval';

export const ctrlSocketIn$ = new BehaviorSubject({} as Actions);
export const ctrlSocketOut$: Subject<Actions> = new Subject();

export function sendStateToControl() {
    const currentState = Array.from(presetMap)
        .map(([presetNr, preset]) => {
            return <IControlPresetMsg>{
                preset: presetNr,
                modifier: preset.modifier,
                state: preset.state,
                title: preset.title,
                config: preset.modifierOptions,
            }
        });
    ctrlSocketOut$.next(Actions.presetState(currentState));
}

ctrlSocketOut$.subscribe(msg => {
    io.emit('toControl', msg);
    // io.emit(msg.type, msg.payload);
});

interval(1000).subscribe(() => {
    io.emit('beat', { beat: true });
});
