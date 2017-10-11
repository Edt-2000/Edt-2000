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
        const videos = this.element.nativeElement.getElementsByClassName('video__player');

        this.switchVideo(0);

        // for (const video of videos) {
        //     video.muted = true; //fix for muted attr bug
        //     video.play();
        //
        //     if(this.glitch) {
        //         this.interval = setInterval(() => {
        //             video.currentTime = Math.random() * video.duration;
        //         }, 1000);
        //     }
        //
        //     // todo: load multiple videos
        //     // all start paused
        //     // remove interval from prev video if glitch true
        //     // new video: check for glitch & effectOverlay (classname) and add/remove
        // }

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
