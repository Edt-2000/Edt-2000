import { mapInput } from "./map-input";
import { IColor } from "../types";

export class ColorHelper {
    static getRGBString(hsvColors: IColor[]) {
        const rgbColors = ColorHelper.hsvArray2RGBArray(hsvColors);

        let bcgColor: string = "";
        if (rgbColors.length === 1) {
            bcgColor = `rgb(${rgbColors[0].join(", ")})`;
        } else {
            bcgColor = `repeating-linear-gradient(`;
            const totalColors: number = rgbColors.length;
            let spacing = 0;
            let currentIndex: number = 0;

            for (const color of rgbColors) {
                const percentage = (100 / totalColors) * currentIndex;
                const percentageNext = (100 / totalColors) * ++currentIndex;
                bcgColor += `, rgb(${color.join(
                    ", ",
                )}) ${percentage}%, rgb(${color.join(
                    ", ",
                )}) ${percentageNext}%`;
                spacing += 100;
            }

            bcgColor += ")";
        }

        return bcgColor;
    }

    static hsvArray2RGBArray(hsvColors: IColor[]) {
        return hsvColors.map(ColorHelper.hsv2rgb);
    }

    static hsv2rgb(hsv: IColor): number[] {
        const h = mapInput(hsv.h, 0, 255, 0, 360) / 60;
        const s = hsv.s / 255;
        let v = hsv.b / 255;
        const hi = Math.floor(h) % 6;

        const f = h - Math.floor(h);
        const p = Math.floor(255 * v * (1 - s));
        const q = Math.floor(255 * v * (1 - s * f));
        const t = Math.floor(255 * v * (1 - s * (1 - f)));
        v *= 255;

        switch (hi) {
            case 0:
                return [v, t, p];
            case 1:
                return [q, v, p];
            case 2:
                return [p, v, t];
            case 3:
                return [p, q, v];
            case 4:
                return [t, p, v];
            case 5:
                return [v, p, q];
            default:
                return [v, t, p];
        }
    }
}
