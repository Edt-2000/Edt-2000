import {Component, OnInit, ElementRef, Input, OnDestroy} from '@angular/core';
import { NgClass } from '@angular/common';

interface IVideoAsset {
    src: string,
    glitch: boolean,
    effectOverlay: boolean
}

@Component({
    selector: 'app-video-tv-effect',
    templateUrl: './video-tv-effect.component.html',
    styleUrls: ['./video-tv-effect.component.scss']
})
export class VideoTvEffectComponent implements OnInit, OnDestroy {
    @Input() video: string;
    @Input() glitch: boolean;
    @Input() effect: boolean;
    private interval;
    private videoAssets: IVideoAsset[];

    constructor(private element: ElementRef) {
        this.videoAssets = [
            {
                src: 'lights-of-orion.mp4',
                glitch: true,
                effectOverlay: true
            }
        ]
    }

    ngOnInit() {
        const video = this.element.nativeElement.getElementsByClassName('video__player')[0];
        video.muted = true; //fix for muted attr bug
        video.play();

        if(this.glitch) {
            this.interval = setInterval(() => {
                video.currentTime = Math.random() * video.duration;
            }, 1000);
        }

        // todo: load multiple videos
        // all start paused
        // remove interval from prev video if glitch true
        // new video: check for glitch & effectOverlay (classname) and add/remove

    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }
}
