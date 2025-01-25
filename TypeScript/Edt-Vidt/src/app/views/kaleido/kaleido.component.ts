import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { ColorHelper } from '../../../../../Shared/colors/converters';
import { IColor } from '../../../../../Shared/colors/types';
import { createFilledArray } from '../../../../../Shared/utils/utils';
import { Sizes } from '../../../../../Shared/vidt/sizes';

@Component({
    selector: 'edt-kaleido',
    templateUrl: './kaleido.component.html',
    styleUrl: './kaleido.component.scss',
    encapsulation: ViewEncapsulation.None,
})
export class KaleidoComponent implements OnInit, OnDestroy {
    public styles: Record<string, string> = {};
    public hexagons: number = 8;
    public kaleidoTime = 4;
    public resetAnimation = false;
    protected readonly createFilledArray = createFilledArray;
    private readonly destroyed = new Subject();

    public ngOnInit() {
        combineLatest([Actions$.vidtMultiColor, Actions$.glitchIntensity, Actions$.size])
            .pipe(takeUntil(this.destroyed))
            .subscribe(([colors, intensity, size]) => {
                this.resetAnimation = true;

                // If multi amount is same as nr of colors, if default 8
                this.hexagons = size === Sizes.large ? 8 : colors.length;

                // Set animation time depending on intensity
                this.kaleidoTime = 10 - intensity;
                this.styles['--animation-kaleido-time'] = `${this.kaleidoTime}s`;

                // Set colors
                this.setColors(colors);

                // Re-trigger animation
                setTimeout(() => (this.resetAnimation = false));
            });
    }

    public setColors(colors: IColor[]) {
        let colorIndex = 0;

        for (let i = 1; i <= this.hexagons; i++) {
            const color = `rgb(${ColorHelper.hsv2rgb(colors[colorIndex]).join(', ')})`;
            this.styles[`--kaleido-${i}`] = color;

            colorIndex++;

            if (colorIndex == colors.length) {
                colorIndex = 0;
            }
        }
    }

    public ngOnDestroy() {
        this.destroyed.next(true);
        this.destroyed.complete();
    }
}
