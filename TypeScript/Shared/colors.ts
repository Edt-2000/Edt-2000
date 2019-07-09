import { IColor } from './types';

export enum Colors {
    Red = 0,
    Orange = 18,
    Yellow = 58,
    Green = 105,
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
        Colors.Green,
        Colors.Turquoise,
        Colors.Blue,
        Colors.Pink,
    ].map(createFullColor),
    [Colors.Red, Colors.Blue].map(createFullColor),
];

export function createFullColor(h: number): IColor {
    return {h, s: 255, b: 255};
}
