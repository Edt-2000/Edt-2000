import { mapInput } from '../utils/map-input';
import { IColor } from './types';

export class ColorHelper {
    static getRGBString(hsvColors: IColor[]) {
        const rgbColors = ColorHelper.hsvArray2RGBArray(hsvColors);

        if (rgbColors.length === 1) {
            return `rgb(${rgbColors[0].join(', ')})`;
        } else {
            const totalColors: number = rgbColors.length;
            let currentIndex: number = 0;
            const colorArray = rgbColors.map((color) => {
                const percentage = (100 / totalColors) * currentIndex;
                const percentageNext = (100 / totalColors) * ++currentIndex;

                return `rgb(${color.join(', ')}) ${percentage}%, rgb(${color.join(', ')}) ${percentageNext}%`;
            });

            return `linear-gradient(90deg,${colorArray.join(', ')})`;
        }
    }

    static getContraColor(hsvColor: IColor): IColor {
        return {
            h: (hsvColor.h + 127) % 256,
            s: hsvColor.s,
            b: hsvColor.b,
        };
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
