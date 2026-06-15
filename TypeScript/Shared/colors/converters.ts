import { mapInput } from '../utils/map-input';
import { IColor } from './types';

export class ColorHelper {
       static getHwbString(hsvColors: IColor[]) {
        if (hsvColors.length === 1) {
            return `hwb(${ColorHelper.hsv2hwb(hsvColors[0])})`;
        } else {
            const totalColors: number = hsvColors.length;
            let currentIndex: number = 0;
            const colorArray = hsvColors.map((color) => {
                const channels = ColorHelper.hsv2hwb(color);
                const percentage = (100 / totalColors) * currentIndex;
                const percentageNext = (100 / totalColors) * ++currentIndex;

                return `hwb(${channels}) ${percentage}%, hwb(${channels}) ${percentageNext}%`;
            });

            return `linear-gradient(90deg,${colorArray.join(', ')})`;
        }
    }

    // Returns the bare HWB channels ("h w% b%") for use inside hwb(...) / CSS custom properties.
    // HSB maps onto HWB exactly: whiteness = (1 - s) * v, blackness = 1 - v, hue unchanged.
    static hsv2hwb(hsv: IColor | undefined): string {
        if (!hsv) return '0 0% 100%'; // black, matching hsv2rgb's [0,0,0]
        const h = mapInput(hsv.h, 0, 255, 0, 360);
        const s = hsv.s / 255;
        const v = hsv.b / 255;
        const w = (1 - s) * v * 100;
        const bl = (1 - v) * 100;
        return `${h} ${w}% ${bl}%`;
    }

    static getContraColor(hsvColor: IColor): IColor {
        return {
            h: (hsvColor.h + 127) % 256,
            s: hsvColor.s,
            b: hsvColor.b,
        };
    }
}
