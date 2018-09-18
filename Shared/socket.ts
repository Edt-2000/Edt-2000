export interface IColor {
    readonly h: number;
    readonly s: number;
    readonly b: number;
}

export interface ITrack {
    left: {
        x: number,
        y: number,
        z: number,
    };
    right: {
        x: number,
        y: number,
        z: number,
    };
}
