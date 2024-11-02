import { PresetLogic } from "../../presets-logic";
import {
    Actions,
    Actions$,
    nextActionFromMsg,
} from "../../../../../Shared/actions/actions";
import {
    MermaidConfig,
    ModifierGroup,
} from "../../../../../Shared/actions/types";

export class FastLedMultiColorToMultiColor extends PresetLogic {
    mermaidConfig: MermaidConfig[];
    modifierOptions = {
        group: [ModifierGroup.Color],
    };

    protected _startPreset(): void {
        this.addSub(
            Actions$.fastLedMultiColor.subscribe((colors) => {
                nextActionFromMsg(Actions.multiColor(colors));
                colors?.[0] &&
                    nextActionFromMsg(Actions.singleColor(colors?.[0]));
            }),
        );
    }

    protected _stopPreset(): void {}
}
