import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { createFilledArray } from '../../../../../Shared/utils/utils';

@Component({
    selector: 'edt-spectrum',
    templateUrl: './spectrum.component.html',
    styleUrl: './spectrum.component.scss',
    encapsulation: ViewEncapsulation.None,
})
export class SpectrumComponent implements OnInit, OnDestroy {
    public styles: Record<string, string> = {};
    public columns = createFilledArray(20);
    public subbars = [
        { rgb: [165, 42 ,42] },
        { rgb: [255,140,0] },
        { rgb: [255,215,0] },
    ];
    public columnSize = 80;
    public columnGap = 16;
    public baseTime = 4;

    private readonly destroyed = new Subject();

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.calculateColumns();
    }

    public ngOnInit() {
        this.calculateColumns();

        combineLatest([Actions$.vidtMultiColor, Actions$.glitchIntensity])
            .pipe(takeUntil(this.destroyed))
            .subscribe(([colors, intensity]) => {
                // Set animation time depending on intensity
                // this.baseTime = 9.5 - intensity;

                // Set colors
                // TODO
                // https://codepen.io/OfigenusMaximus/pen/oNyoORG
            });
    }

    public calculateColumns() {
        const amount = Math.floor(window.innerWidth / (this.columnSize + this.columnGap));
        this.columns = createFilledArray(amount);
    }

    public getDelayModifier(index: number): number {
        const half = Math.floor((this.subbars.length - 1) / 2);
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
