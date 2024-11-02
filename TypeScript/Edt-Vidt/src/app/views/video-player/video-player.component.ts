import { AfterContentInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Actions$ } from '../../../../../Shared/actions/actions';

@Component({
    selector: 'edt-video-player',
    templateUrl: './video-player.component.html',
    styleUrl: './video-player.component.scss',
})
export class VideoPlayerComponent implements AfterContentInit, OnDestroy {
    public src: string = '';
    public interval?: number;
    public overlay = false;
    @ViewChild('video') videoRef?: ElementRef<HTMLVideoElement>;
    private readonly destroyed = new Subject();

    public ngAfterContentInit() {
        Actions$.videoSrc.pipe(takeUntil(this.destroyed)).subscribe((video: string) => {
            this.setSrc(video);
        });

        Actions$.mainBeat.pipe(takeUntil(this.destroyed)).subscribe(() => {
            this.glitchVideo();
        });
    }

    public ngOnDestroy() {
        this.destroyed.next(true);
        this.destroyed.complete();
    }

    setSrc(src: string) {
        const path = `./assets/media-by-group/${src}`;
        if (this.src !== path) {
            this.src = path;
            requestAnimationFrame(() => {
                this.playVideo();
            });
        }
    }

    playVideo() {
        if (this.interval) {
            clearInterval(this.interval);
        }

        if (this.videoRef) {
            this.stopVideo();

            this.videoRef.nativeElement.load();
            this.videoRef.nativeElement.addEventListener('loadedmetadata', () => {
                if (this.videoRef) {
                    this.videoRef.nativeElement.currentTime = Math.random() * this.videoRef.nativeElement.duration;
                }
            });
            this.videoRef.nativeElement.muted = true; // fix for muted attr bug
            this.videoRef.nativeElement.play();
        }
    }

    glitchVideo() {
        if (this.interval) {
            clearInterval(this.interval);
        }

        if (this.videoRef) {
            this.videoRef.nativeElement.currentTime = Math.random() * this.videoRef.nativeElement.duration;
        }
    }

    glitchVideoContinuous() {
        if (!this.videoRef) {
            return;
        }

        this.interval = window.setInterval(() => {
            if (this.videoRef) {
                this.videoRef.nativeElement.currentTime = Math.random() * this.videoRef.nativeElement.duration;
            }
        }, 1000);
    }

    stopVideo() {
        if (this.videoRef) {
            const isPlaying =
                this.videoRef.nativeElement.currentTime > 0 &&
                !this.videoRef.nativeElement.paused &&
                !this.videoRef.nativeElement.ended &&
                this.videoRef.nativeElement.readyState > this.videoRef.nativeElement.HAVE_CURRENT_DATA;
            if (isPlaying) {
                this.videoRef.nativeElement.pause();
            }
        }
    }
}
