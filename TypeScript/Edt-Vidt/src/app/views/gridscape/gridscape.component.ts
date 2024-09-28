import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { Subject, takeUntil } from 'rxjs';
import { createFilledArray } from '../../../../../Shared/utils/utils';

@Component({
    selector: 'edt-gridscape',
    templateUrl: './gridscape.component.html',
    styleUrl: './gridscape.component.scss',
})
export class GridscapeComponent implements AfterViewInit, OnDestroy {
    @ViewChild('sun') sunRef?: ElementRef<HTMLElement>;

    public animation?: Animation;

    private readonly destroyed = new Subject();
    stars = createFilledArray(40);

    public ngAfterViewInit() {
        this.animation = this.sunRef?.nativeElement.animate(
            [
                {
                    transform: 'translate(-50%, -62%) scale(1)',
                },
                {
                    transform: 'translate(-50%, -62%) scale(1.2)',
                },
                {
                    transform: 'translate(-50%, -62%) scale(1)',
                },
            ],
            {
                easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
                duration: 200,
            },
        );

        if (this.animation) {
            this.animation.pause();
        }

        Actions$.mainBeat.pipe(takeUntil(this.destroyed)).subscribe(() => {
            this.animate();
        });
    }

    public animate() {
        if (!this.animation) {
            return;
        }
        requestAnimationFrame(() => {
            if (this.animation?.playState === 'running') {
                this.animation.cancel();
            }

            requestAnimationFrame(() => {
                this.animation?.play();
            });
        });
    }

    public ngOnDestroy() {
        this.destroyed.next(true);
        this.destroyed.complete();
    }

    protected readonly createFilledArray = createFilledArray;
}
