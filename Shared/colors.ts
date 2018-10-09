import {IColor} from "./types";

export enum Colors {
    Red = 0,
    Orange = 18,
    Yellow = 58,
    Lime = 85,
    Green = 95,
    SeaGreen = 105,
    Turquoise = 129,
    Blue = 158,
    Purple = 183,
    Pink = 218,
}

export const colorSets: IColor[][] = [
    [
        Colors.Red,
        Colors.Orange,
        Colors.Yellow,
        Colors.Lime,
        Colors.Green,
        Colors.SeaGreen,
        Colors.Turquoise,
        Colors.Blue,
        Colors.Purple,
        Colors.Pink,
    ].map(createFullColor),
];

export function createFullColor(h: number): IColor {
    return {h, s: 255, b: 255};
}
