import {io} from '../communication/sockets';
import {IControlPresetMsg} from '../../../Shared/types';
import {Actions} from '../../../Shared/actions';
import {presets} from "../presets/presets";

export function toControl(msg: Actions) {
    io.emit('toControl', msg);
}

export function sendStateToControl() {
    toControl(
        Actions.presetState(
            Object.getOwnPropertyNames(presets)
                .map((presetNr) => {
                    const preset = presets[presetNr];
                    return <IControlPresetMsg>{
                        preset: +presetNr, // preset key is a string, but send it as number
                        modifier: preset.modifier,
                        state: preset.state,
                        title: preset.title,
                        config: preset.modifierOptions,
                    }
                }),
        ),
    );
}
