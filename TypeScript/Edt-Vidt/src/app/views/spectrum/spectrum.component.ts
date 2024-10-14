import { Component, HostListener, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { map, Observable, startWith, Subject } from 'rxjs';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { ColorHelper } from '../../../../../Shared/colors/converters';
import { createFilledArray } from '../../../../../Shared/utils/utils';
import { AnimationTypes } from '../../../../../Shared/vidt/animation';

@Component({
    selector: 'edt-spectrum',
    templateUrl: './spectrum.component.html',
    styleUrl: './spectrum.component.scss',
    encapsulation: ViewEncapsulation.None,
})
export class SpectrumComponent implements OnInit, OnDestroy {
    public modifier$: Observable<string> =
        Actions$.animationType.pipe(
            map((type) => {
                if (type === AnimationTypes.lava) {
                    return 'spectrum--lava';
                } else {
                    return '';
                }
            }),
        );

    public baseTime$: Observable<number> =
        Actions$.glitchIntensity.pipe(
            map((intensity) => {
                return Math.max((9.5 - intensity), 1.5);
            }),
            startWith(4),
        )

    public subbars$: Observable<{rgb: number[]}[]> =
        Actions$.vidtMultiColor.pipe(
            map((colors) => {
                if (!colors || colors.length === 0) {
                    return [
                        { rgb: [165, 42 ,42] },
                        { rgb: [255,140,0] },
                        { rgb: [255,215,0] },
                    ]
                }

                // Set colors
                const color1 = colors[0];
                const color2 = colors[1] ?? ColorHelper.getContraColor(colors[0]);
                const color3 = colors[3] ?? colors[0]

                return [
                    { rgb: ColorHelper.hsv2rgb(color1) },
                    { rgb: ColorHelper.hsv2rgb(color2) },
                    { rgb: ColorHelper.hsv2rgb(color3) },
                ]
            }),
            startWith([
                { rgb: [165, 42 ,42] },
                { rgb: [255,140,0] },
                { rgb: [255,215,0] },
            ]),
        )

    public styles: Record<string, string> = {};
    public columns = createFilledArray(20);
    public columnSize = 80;
    public columnGap = 16;

    private readonly destroyed = new Subject();

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.calculateColumns();
    }

    public ngOnInit() {
        this.calculateColumns();
    }

    public calculateColumns() {
        const amount = Math.floor(window.innerWidth / (this.columnSize + this.columnGap));
        this.columns = createFilledArray(amount);
    }

    public getDelayModifier(index: number, subbarsLength: number): number {
        const half = Math.floor((subbarsLength - 1) / 2);
        const step = 0.1;
        const start = 1 - (step * half);
        return start + (index * step);
    }

    public getBarHeight(index: number): number {
        let step = 30;

        switch (index) {
            case 1: step = 30; break;
            case 2: step = 25; break;
            case 3: case 4: step = 10; break;
            default: step = 25;
        }

        const start = 100;
        return start - (index * step);
    }

    public ngOnDestroy() {
        this.destroyed.next(true);
        this.destroyed.complete();
    }
}
