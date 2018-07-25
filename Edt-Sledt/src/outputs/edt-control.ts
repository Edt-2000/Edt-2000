import {io} from '../communication/sockets';
import {presetMap} from '../presets/presets-logic';
import {IControlPresetMsg} from '../../../Shared/types';
import {Actions} from '../../../Shared/actions';

export function toControl(msg: Actions) {
    io.emit('toControl', msg);
}

export function sendStateToControl() {
    toControl(
        Actions.presetState(
            Array.from(presetMap)
                .map(([presetNr, preset]) => {
                    return <IControlPresetMsg>{
                        preset: presetNr,
                        modifier: preset.modifier,
                        state: preset.state,
                        title: preset.title,
                        config: preset.modifierOptions,
                    }
                }),
        ),
    );
}
