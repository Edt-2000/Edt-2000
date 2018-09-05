import { mapInput } from './map-input';
import { IColor } from '../socket';

export class ColorHelper {
    static getRGBString(hsvColors: IColor[]) {
        const rgbColors = ColorHelper.hsvArray2RGBArray(hsvColors);

        let bcgColor: string = '';
        if (rgbColors.length === 1) {
            bcgColor = `rgb(${rgbColors[0].join(', ')})`;
        }
        else {
            bcgColor = `repeating-linear-gradient(-45deg`;
            const totalColors: number = rgbColors.length;
            let spacing = 0;
            let currentIndex: number = 0;

            for (const color of rgbColors) {
                const percentage = (100 / totalColors) * currentIndex;
                const percentageNext = (100 / totalColors) * ++currentIndex;
                bcgColor += `, rgb(${color.join(', ')}) ${percentage}%, rgb(${color.join(', ')}) ${percentageNext}%`;
                spacing += 100;
            }

            bcgColor += ')';
        }

        return bcgColor;
    }

    static hsvArray2RGBArray(hsvColors: IColor[]) {
        return hsvColors.map((color) => {
            return ColorHelper.hsv2rgb(color);
        })
    }

    static hsv2rgb(hsv: IColor): number[] {
        const h = mapInput(hsv.hue, 0, 255, 0, 360) / 60;
        const s = hsv.saturation / 255;
        let v = hsv.brightness / 255;
        const hi = Math.floor(h) % 6;

        const f = h - Math.floor(h);
        const p = 255 * v * (1 - s);
        const q = 255 * v * (1 - (s * f));
        const t = 255 * v * (1 - (s * (1 - f)));
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
