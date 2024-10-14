import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { createFilledArray } from '../../../../../Shared/utils/utils';

@Component({
    selector: 'edt-spectrum',
    templateUrl: './spectrum.component.html',
    styleUrl: './spectrum.component.scss'
})
export class SpectrumComponent implements OnInit, OnDestroy {
    public styles: Record<string, string> = {};
    public columns = createFilledArray(20);
    public baseTime = 4;

    private readonly destroyed = new Subject();

    public ngOnInit() {
        combineLatest([Actions$.vidtMultiColor, Actions$.glitchIntensity])
            .pipe(takeUntil(this.destroyed))
            .subscribe(([colors, intensity]) => {
                // Set animation time depending on intensity
                this.baseTime = 10 - intensity;
                this.styles ['--animation-kaleido-time'] = `${this.baseTime}s`;

                // Set colors
                // TODO
                // https://codepen.io/OfigenusMaximus/pen/oNyoORG
            });
    }

    public ngOnDestroy() {
        this.destroyed.next(true);
        this.destroyed.complete();
    }
}
