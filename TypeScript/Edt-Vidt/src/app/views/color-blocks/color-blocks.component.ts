import { Component, OnDestroy, OnInit } from '@angular/core';
import { Sizes } from '../../../../../Shared/vidt/sizes';
import { Shapes } from '../../../../../Shared/vidt/shapes';
import { Subject, takeUntil } from 'rxjs';
import { IColor } from '../../../../../Shared/colors/types';
import { ColorHelper } from '../../../../../Shared/colors/converters';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { createFilledArray } from '../../../../../Shared/utils/utils';

@Component({
    selector: 'edt-color-blocks',
    templateUrl: './color-blocks.component.html',
    styleUrl: './color-blocks.component.scss',
})
export class ColorBlocksComponent implements OnInit, OnDestroy {
    public sizeClass: string = '';
    public shapeClass: string = '';

    public size: Sizes = Sizes.normal;
    public shape: Shapes = Shapes.square;
    public blocks = createFilledArray(50);

    public frontColor: string = '#ff0000';
    public backColor: string = '#00ff00';

    private readonly destroyed = new Subject();

    public ngOnInit() {
        Actions$.shape.pipe(takeUntil(this.destroyed)).subscribe((shape: Shapes) => {
            this.shape = shape;
            this.shapeClass = 'color-blocks--' + this.shape;
        });

        Actions$.size.pipe(takeUntil(this.destroyed)).subscribe((size: Sizes) => {
            this.size = size;
            this.sizeClass = 'color-blocks--' + this.size;
            const amount = this.size === 'small' ? 75 : 50;
            this.blocks = createFilledArray(amount);
        });

        Actions$.vidtSingleColor.pipe(takeUntil(this.destroyed)).subscribe((color: IColor) => {
            this.setColors(color, ColorHelper.getContraColor(color));
        });

        Actions$.vidtMultiColor.pipe(takeUntil(this.destroyed)).subscribe((colors: IColor[]) => {
            if (colors.length === 1) {
                this.setColors(colors[0], ColorHelper.getContraColor(colors[0]));
            } else if (colors.length > 1) {
                this.setColors(colors[0], colors[colors.length]);
            }
        });
    }

    public setColors(front: IColor, back: IColor) {
        this.frontColor = ColorHelper.getRGBString([front]);
        this.backColor = ColorHelper.getRGBString([back]);
    }

    public ngOnDestroy() {
        this.destroyed.next(true);
        this.destroyed.complete();
    }
}
