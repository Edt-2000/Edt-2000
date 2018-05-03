import {io} from '../communication/sockets';
import {presetMap} from '../presets/presets-logic';
import {IControlPresetMsg} from '../../../Shared/types';
import {Actions} from '../../../Shared/actions';

export function toControl(msg: Actions) {
    console.log('toControl:', msg);
    io.emit('toControl', msg);
}

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
    toControl(Actions.presetState(currentState));
}
