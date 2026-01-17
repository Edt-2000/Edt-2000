import { IColor } from "../../Shared/colors/types";
import { whiteColor } from "../../Shared/colors/utils";

export function createFullColor(h: number): IColor {
    if (h === 255) return whiteColor;
    return { h, s: 255, b: 255 };
}
