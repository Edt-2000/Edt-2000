import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AnimationTypes } from '../../../../../Shared/vidt/animation';
import { Actions$ } from '../../../../../Shared/actions/actions';

@Component({
    selector: 'edt-photo-bouncer',
    templateUrl: './photo-bouncer.component.html',
    styleUrl: './photo-bouncer.component.scss',
    encapsulation: ViewEncapsulation.None,
})
export class PhotoBouncerComponent implements AfterViewInit, OnInit, OnDestroy {
    public animation?: Animation;
    public src: string = '';

    private readonly destroyed = new Subject();

    private currentAnimation = AnimationTypes.bounce;

    private animations = {
        [AnimationTypes.bounce]: [
            {
                transform: 'scale(1)',
            },
            {
                transform: 'scale(1.5)',
            },
            {
                transform: 'scale(1)',
            },
        ],
        [AnimationTypes.mirror]: [
            {
                offset: 0,
                transform: 'scaleX(1)',
            },
            {
                offset: 0.49,
                transform: 'scaleX(1)',
            },
            {
                offset: 0.5,
                transform: 'scaleX(-1)',
            },
            {
                offset: 0.99,
                transform: 'scaleX(-1)',
            },
            {
                offset: 1,
                transform: 'scaleX(1)',
            },
        ],
    };

    private animationsConfig = {
        bounce: {
            easing: 'linear',
            duration: 200,
        },
        mirror: {
            easing: 'linear',
            // fill: 'forwards',
            duration: 600,
        },
    };

    @ViewChild('image') imgRef?: ElementRef<HTMLImageElement>;


    public ngAfterViewInit() {
        this.setAnimation(AnimationTypes.bounce);

        // Actions$.animationType.pipe(takeUntil(this.destroyed)).subscribe((animation) => {
        //     if (animation !== this.currentAnimation) {
        //         this.setAnimation(animation);
        //     }
        // });
    }

    public ngOnInit() {
        Actions$.mainBeat.pipe(takeUntil(this.destroyed)).subscribe(() => {
            this.animate();
        });

        Actions$.imageSrc.pipe(takeUntil(this.destroyed)).subscribe((photo) => {
            this.setSrc(photo);
        });
    }

    public setSrc(src: string) {
        this.src = `./assets/media-by-group/${src}`;
    }

    public setAnimation(type: AnimationTypes) {
        if (type === AnimationTypes.bounce || type === AnimationTypes.mirror) {
            this.currentAnimation = type;

            if (this.animation) {
                this.animation.cancel();
            }

            this.animation = this.imgRef?.nativeElement.animate(this.animations[type], this.animationsConfig[type]);
        }
    }

    public animate() {
        requestAnimationFrame(() => {
            if (this.animation?.playState === 'running') {
                this.animation.finish();
            }

            requestAnimationFrame(() => {
                this.animation?.play();
                this.animation?.reverse();
            });
        });
    }

    public ngOnDestroy() {
        this.destroyed.next(true);
        this.destroyed.complete();
    }
}
