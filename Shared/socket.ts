export interface IColor {
    readonly hue: number;
    readonly saturation: number;
    readonly brightness: number;
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
