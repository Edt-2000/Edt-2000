import {PresetLogic} from "../../presets-logic";
import {Actions, Actions$, nextActionFromMsg} from "../../../../../Shared/actions";
import {modifiers} from "../../../../../Shared/modifiers";

export class VidtBeatToGlitchIntensity extends PresetLogic {
    modifierOptions = {
        select: modifiers.glitchIntensity,
    };

    protected _startPreset(): void {
        this.addSub(Actions$.vidtBeat.subscribe(() => {
            nextActionFromMsg(Actions.glitchIntensity(this.modifier));
        }));
    }

    protected _stopPreset(): void {
    }

}
