import { IColor } from '../../Shared/colors/types';

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
    [...[
        Colors.Red,
        Colors.Orange,
        Colors.Yellow,
        Colors.Green,
        Colors.Turquoise,
        Colors.Blue,
        Colors.Pink,
        Colors.Purple,
    ].map(createFullColor)],
    [...[
        Colors.Red,
        Colors.Orange,
        Colors.Green,
        Colors.Pink,
    ].map(createFullColor)],
    [...[
        Colors.Orange,
        Colors.Green,
        Colors.Blue,
    ].map(createFullColor)],
    [...[
        Colors.Red,
        Colors.Blue,
        Colors.Orange,
        Colors.Pink,
        Colors.Purple,
    ].map(createFullColor)],
    [...[
        Colors.Turquoise,
        Colors.Pink,
        Colors.Blue,
    ].map(createFullColor)],
];

function createFullColor(h: number): IColor {
    return { h, s: 255, b: 255 };
}
