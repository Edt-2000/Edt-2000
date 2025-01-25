import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IColor } from '../../../../../Shared/colors/types';
import { ColorHelper } from '../../../../../Shared/colors/converters';
import { Actions$ } from '../../../../../Shared/actions/actions';

@Component({
    selector: 'edt-color-glitch',
    templateUrl: './color-glitch.component.html',
    styleUrl: './color-glitch.component.scss',
})
export class ColorGlitchComponent {
    public firstColor: string = '#ff179a';
    public secondColor: string = '#16de00';

    private readonly destroyed = new Subject();

    public ngOnInit() {
        Actions$.vidtSingleColor.pipe(takeUntil(this.destroyed)).subscribe((color: IColor) => {
            this.setColors(color, ColorHelper.getContraColor(color));
        });

        Actions$.vidtMultiColor.pipe(takeUntil(this.destroyed)).subscribe((colors: IColor[]) => {
            if (colors.length > 1) {
                this.setColors(colors[0], colors[colors.length]);
            } else if (colors.length === 1) {
                this.setColors(colors[0], ColorHelper.getContraColor(colors[0]));
            }
        });
    }

    public ngOnDestroy() {
        this.destroyed.next(true);
        this.destroyed.complete();
    }

    public setColors(first: IColor, second: IColor) {
        this.firstColor = `rgb(${ColorHelper.hsv2rgb(first).join(', ')})`;
        this.secondColor = `rgb(${ColorHelper.hsv2rgb(second).join(', ')})`;
    }
}
