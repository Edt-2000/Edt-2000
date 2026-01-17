import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { AnimationTypes } from '../../../../../Shared/vidt/animation';

@Component({
    selector: 'edt-photo-glitcher',
    templateUrl: './photo-glitcher.component.html',
    styleUrl: './photo-glitcher.component.scss',
})
export class PhotoGlitcherComponent implements OnInit, OnDestroy {
    public animation: AnimationTypes = AnimationTypes.bounce;
    public src: string = '';

    private readonly destroyed = new Subject();

    public ngOnInit() {
        Actions$.animationType.pipe(takeUntil(this.destroyed)).subscribe((animation) => {
            this.animation = animation;
        });

        Actions$.imageSrc.pipe(takeUntil(this.destroyed)).subscribe((photo) => {
            this.setSrc(photo);
        });
    }

    public setSrc(src: string) {
        this.src = `./assets/media-by-group/${src}`;
    }

    public ngOnDestroy() {
        this.destroyed.next(true);
        this.destroyed.complete();
    }
}
