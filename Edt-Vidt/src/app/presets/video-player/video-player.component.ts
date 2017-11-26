import {Component, OnInit, ElementRef, Input, OnDestroy} from '@angular/core';
import { NgClass } from '@angular/common';

interface IVideoAsset {
    src: string,
    glitch: boolean,
    effectOverlay: boolean
}

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {

    private interval;
    private videoAssets: IVideoAsset[];
    public src: string;
    public glitch: boolean;
    public effectOverlay: boolean;

    constructor(private element: ElementRef) {
        this.videoAssets = [
            {
                src: "lights-of-orion.mp4",
                glitch: true,
                effectOverlay: true
            }
        ]
    }

    ngOnInit() {
        const video = this.element.nativeElement.getElementsByClassName('video__player');

        // todo change video nr with ipad
        this.switchVideo(0);

        video.muted = true; //fix for muted attr bug
        video.play();

        if(this.glitch) {
            this.interval = setInterval(() => {
                video.currentTime = Math.random() * video.duration;
            }, 1000);
        }
    }

    switchVideo(videoIndex: number) {
        const video = this.videoAssets[videoIndex];
        if (video === undefined) {
            return;
        }

        [this.src, this.glitch, this.effectOverlay] = [video.src, video.glitch, video.effectOverlay];
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }
}
