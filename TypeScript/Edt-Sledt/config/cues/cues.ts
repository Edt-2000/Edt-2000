import { drumCues } from "./drums/drums";
import { ICue } from "../../../Shared/actions/types";
import { presetChange } from "../../src/presets/presets-logic";
import { ColorToVidtColor } from "../../src/presets/outputs/vidt/colorToVidtColor";
import { BeatToColor } from "../../src/presets/converters/beat/beatToColor";
import { FastLedMultiColorToMultiColor } from "../../src/presets/outputs/vidt/fastLedMultiColorToMultiColor";
import { MultiColorToVidtMultiColor } from "../../src/presets/outputs/vidt/multiColorToVidtMultiColor";

const colorCues = [
    {
        label: "Colors",
        actions: [
            presetChange(new ColorToVidtColor(), 127, true),
            presetChange(new BeatToColor(), 127, true),
            presetChange(new MultiColorToVidtMultiColor(), 127, true),
            presetChange(new FastLedMultiColorToMultiColor(), 127, true),
        ],
    },
];

export const presetCues: ICue[] = [...drumCues, ...colorCues];
