import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { Sizes } from '../../../../../Shared/vidt/sizes';
import { IColor } from '../../../../../Shared/colors/types';
import { ColorHelper } from '../../../../../Shared/colors/converters';
import { createFilledArray } from '../../../../../Shared/utils/utils';

@Component({
    selector: 'edt-kaleido',
    templateUrl: './kaleido.component.html',
    styleUrl: './kaleido.component.scss',
    // We need this for the created HTML elements to work
    // TODO: we need a more angular-ly solution for this...
    encapsulation: ViewEncapsulation.None,
})
export class KaleidoComponent implements OnInit, OnDestroy {
    public styles: Object = {};
    public hexagons: number = 8;
    public kaleidoTime = 4;
    public resetAnimation = false;

    private readonly destroyed = new Subject();

    public ngOnInit() {
        combineLatest([Actions$.colorPalette, Actions$.glitchIntensity, Actions$.size])
            .pipe(takeUntil(this.destroyed))
            .subscribe(([colors, intensity, size]) => {
                this.resetAnimation = true;

                // If multi amount is same as nr of colors, if default 8
                this.hexagons = size === Sizes.large ? 8 : colors.length;

                // Set animation time depending on intensity
                this.kaleidoTime = 10 - intensity;
                this.styles = {
                    '--animation-kaleido-time': `${this.kaleidoTime}s`,
                };

                // Set colors
                this.setColors(colors);

                // Re-trigger animation
                setTimeout(() => (this.resetAnimation = false));
            });
    }

    public setColors(colors: IColor[]) {
        let colorIndex = 0;

        colors.forEach((color, i) => {
            const colorRgb = `rgb(${ColorHelper.hsv2rgb(color).join(', ')}`;
            document.documentElement.style.setProperty(`--kaleido-${i}`, `${colorRgb}`);
        });
    }

    public ngOnDestroy() {
        this.destroyed.next(true);
        this.destroyed.complete();
    }

    protected readonly createFilledArray = createFilledArray;
}
