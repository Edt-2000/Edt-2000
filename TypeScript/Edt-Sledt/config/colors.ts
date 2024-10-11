import { IColor } from "../../Shared/colors/types";

export function createFullColor(h: number): IColor {
    return { h, s: 255, b: 255 };
}
