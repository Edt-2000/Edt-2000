import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IVideoAsset, videoAssets} from '../../../data/assets';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
    @ViewChild('videoplayer') videoplayer: any;

    private interval;
    public video: IVideoAsset;

    constructor(private element: ElementRef) {
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
        const video = videoAssets[videoIndex];
        if (!video) {
            this.video = videoAssets[0]
        } else {
            this.video = video;
        }
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }
}
