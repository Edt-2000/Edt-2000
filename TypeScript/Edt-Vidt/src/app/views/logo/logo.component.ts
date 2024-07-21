import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, startWith, Subject, takeUntil } from 'rxjs';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { mapInput } from '../../../../../Shared/utils/map-input';

@Component({
    selector: 'edt-logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit, OnDestroy {
    public level: number = 0;
    public text: string = 'Strobocops';
    public timeOut: number | null = null;

    private readonly destroyed = new Subject();

    public ngOnInit() {
            combineLatest([
            // As MainBeat is 'hot' we need startWith to kick off conmbineLatest
            Actions$.mainBeat.pipe(startWith(0)),
            Actions$.glitchIntensity,
        ])
        .pipe(
            takeUntil(this.destroyed),
        )
        .subscribe(([beat, intensity]) => {
            if (intensity) {
                this.glitch(intensity);
            }
        });
    }

    public ngOnDestroy() {
        this.destroyed.next(true);
        this.destroyed.complete();
    }

    public glitch(input: number): void {
        if (this.timeOut) {
            clearTimeout(this.timeOut);
            this.timeOut = null;
            this.level = 0;
        }

        this.level = mapInput(input, 1, 9, 1, 20);

        this.decay();
    }

    public decay(): void {
        if (this.timeOut) {
            clearTimeout(this.timeOut);
        }

        this.timeOut = window.setTimeout(() => {
            this.level = Math.ceil(this.level / 2.0);

            if (this.level > 1) {
                this.decay();
            }
        }, 220);
    }

}
