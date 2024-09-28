import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { ColorHelper } from '../../../../../Shared/colors/converters';
import { IColor } from '../../../../../Shared/colors/types';

@Component({
  selector: 'edt-wheel',
  templateUrl: './wheel.component.html',
  styleUrl: './wheel.component.scss'
})
export class WheelComponent implements OnInit, OnDestroy  {
    public firstColor: string = '#ff0000';
    public secondColor: string = '#00ff00';
    private readonly destroyed = new Subject();

    public ngOnInit() {
        Actions$.vidtSingleColor
            .pipe(takeUntil(this.destroyed))
            .subscribe((color: IColor) => {
                this.setColors(color, ColorHelper.getContraColor(color));
            });

        Actions$.vidtMultiColor
            .pipe(takeUntil(this.destroyed))
            .subscribe((colors: IColor[]) => {
                if (colors.length > 1) {
                    this.setColors(colors[0], colors[colors.length]);
                } else {
                    this.setColors(colors[0], ColorHelper.getContraColor(colors[0]));

                }
            });
    }

    public ngOnDestroy() {
        this.destroyed.next(true);
        this.destroyed.complete();
    }

    public setColors(first: IColor, second: IColor) {
        this.firstColor = ColorHelper.getRGBString([first]);
        this.secondColor = ColorHelper.getRGBString([second]);
    }
}
