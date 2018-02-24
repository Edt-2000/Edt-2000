import {Component, OnInit, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
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
    @ViewChild('videoplayer') videoplayer: any;

    private interval;
    private videoAssets: IVideoAsset[];
    public video: IVideoAsset;

    constructor(private element: ElementRef) {
        this.videoAssets = [
            {
                src: 'lights-of-orion.mp4',
                glitch: true,
                effectOverlay: true
            },
            {
                src: 'video-kat.mp4',
                glitch: true,
                effectOverlay: true
            }
        ]
    }

    ngOnInit() {
        // todo change video nr with ipad
       this.switchVideo(0);

        if (this.video !== undefined) {
            this.playVideo();
        }

    }

    playVideo() {
        if (this.interval) {
            clearInterval(this.interval);
        }

        this.videoplayer.nativeElement.muted = true; // fix for muted attr bug
        this.videoplayer.nativeElement.play();

        if(this.video.glitch) {
            this.interval = setInterval(() => {
                this.videoplayer.nativeElement.currentTime = Math.random() * this.videoplayer.nativeElement.duration;
            }, 1000);
        }
    }

    switchVideo(videoIndex: number) {
        const video = this.videoAssets[videoIndex];
        if (!video) {
            console.error(`Video doesn't exist`);
            return;
        }

        this.video = video;
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }
}
