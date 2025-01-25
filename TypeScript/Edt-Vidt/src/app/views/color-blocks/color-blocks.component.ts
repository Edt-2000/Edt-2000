import { Component } from '@angular/core';
import { Sizes } from '../../../../../Shared/vidt/sizes';
import { Shapes } from '../../../../../Shared/vidt/shapes';
import { filter, map, merge, startWith } from 'rxjs';
import { IColor } from '../../../../../Shared/colors/types';
import { ColorHelper } from '../../../../../Shared/colors/converters';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { createFilledArray } from '../../../../../Shared/utils/utils';

@Component({
    selector: 'edt-color-blocks',
    templateUrl: './color-blocks.component.html',
    styleUrl: './color-blocks.component.scss',
})
export class ColorBlocksComponent {
    public shapeClass$ = Actions$.shape.pipe(map((shape: Shapes) => 'color-blocks--' + Shapes[shape]));

    public sizeClass$ = Actions$.size.pipe(map((size: Sizes) => 'color-blocks--' + Sizes[size]));
    public blocks$ = Actions$.size.pipe(
        map((size) => (size === Sizes.small ? 75 : 50)),
        startWith(50),
        map((size) => createFilledArray(size)),
    );

    public singleColor$ = Actions$.vidtSingleColor.pipe(
        map((color: IColor) => ({ front: color, back: ColorHelper.getContraColor(color) })),
    );
    public multiColor$ = Actions$.vidtMultiColor.pipe(
        filter((colors) => colors.length > 0),
        map((colors: IColor[]) => {
            if (colors.length === 1) {
                return {
                    front: colors[0],
                    back: ColorHelper.getContraColor(colors[0]),
                };
            } else {
                return {
                    front: colors[0],
                    back: colors[colors.length - 1], // Correctly accessing the last element
                };
            }
        }),
    );

    public colorRgbString$ = merge(this.singleColor$, this.multiColor$).pipe(
        map(({ front, back }) => ({
            frontColor: ColorHelper.getRGBString([front]),
            backColor: ColorHelper.getRGBString([back]),
        })),
    );
}
