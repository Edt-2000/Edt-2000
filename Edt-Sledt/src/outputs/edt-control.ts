import {Subject} from 'rxjs/Subject';
import {io} from '../communication/sockets';
import {presetMap} from '../presets/presets-logic';
import {IControlPresetMsg} from '../../../Shared/types';
import {ctrlActions, PresetActions} from '../../../Shared/actions';

export const ctrlSocketIn$: Subject<ctrlActions> = new Subject();
export const ctrlSocketOut$: Subject<ctrlActions> = new Subject();

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
    ctrlSocketOut$.next(PresetActions.presetState(currentState));
}

ctrlSocketOut$.subscribe(msg => {
    console.log('toControl:', msg);
    io.emit('toControl', msg);
});
