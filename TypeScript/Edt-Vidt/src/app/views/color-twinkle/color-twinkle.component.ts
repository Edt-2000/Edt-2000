import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IColor } from '../../../../../Shared/colors/types';
import { ColorHelper } from '../../../../../Shared/colors/converters';
import { Actions$ } from '../../../../../Shared/actions/actions';

const AMOUNT_OF_STARS = 400;

@Component({
    selector: 'edt-color-twinkle',
    templateUrl: './color-twinkle.component.html',
    styleUrl: './color-twinkle.component.scss',
})
export class ColorTwinkleComponent implements OnInit, OnDestroy {
    public styles: Object = {};

    private readonly destroyed = new Subject();
    stars = new Array(AMOUNT_OF_STARS).fill(0).map((_, i) => i);

    public ngOnInit() {
        Actions$.vidtSingleColor.pipe(takeUntil(this.destroyed)).subscribe((item) => {
            this.setStyles(item);
        });
    }

    public ngOnDestroy() {
        this.destroyed.next(true);
        this.destroyed.complete();
    }

    public setStyles(hsb: IColor) {
        this.styles = {
            color: ColorHelper.getRGBString([hsb]),
        };
    }
}
