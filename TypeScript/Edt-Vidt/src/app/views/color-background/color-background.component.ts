import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { IColor } from '../../../../../Shared/colors/types';
import { ColorHelper } from '../../../../../Shared/colors/converters';

@Component({
  selector: 'edt-color-background',
  templateUrl: './color-background.component.html',
  styleUrl: './color-background.component.scss'
})
export class ColorBackgroundComponent {
    public styles: Object = {};

    private readonly destroyed = new Subject();

    public ngOnInit() {
        Actions$.vidtSingleColor
            .pipe(takeUntil(this.destroyed))
            .subscribe((color: IColor) => {
                this.setStyles([color]);
            });

        Actions$.vidtMultiColor.pipe(takeUntil(this.destroyed))
            .subscribe((colors: IColor[]) => {
                this.setStyles([colors[0]]);
            });
    }

    public setStyles(colors: IColor[]) {
        const bcgColor = ColorHelper.getRGBString(colors);
        this.styles = {
            background: `${bcgColor}`,
        };
    }
    public ngOnDestroy() {
        this.destroyed.next(true);
        this.destroyed.complete();
    }
}
