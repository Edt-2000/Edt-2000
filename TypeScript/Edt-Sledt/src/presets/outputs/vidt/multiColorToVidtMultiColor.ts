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
import { modifiers } from "../../../../config/modifiers";
import { ColorVariations } from "../../../../config/config";
import { rescale } from "../../../../../Shared/utils/utils";

export class MultiColorToVidtMultiColor extends PresetLogic {
    mermaidConfig: MermaidConfig[];
    modifierOptions = {
        select: modifiers.colorVariation,
        group: [ModifierGroup.Vidt, ModifierGroup.Color],
    };

    protected _startPreset(): void {
        this.addSub(
            Actions$.multiColor.subscribe((colors) => {
                const maybeNewColors =
                    this.modifier === ColorVariations.inverse
                        ? colors.map((color) => ({
                              h: (color.h + rescale(63, 127, 0, 255)) % 255,
                              s: color.s,
                              b: color.b,
                          }))
                        : colors;
                nextActionFromMsg(Actions.vidtMultiColor(maybeNewColors));
            }),
        );
    }

    protected _stopPreset(): void {}
}
