import {Component, OnInit, ElementRef, Input} from '@angular/core';

@Component({
    selector: 'app-video-tv-effect',
    templateUrl: './video-tv-effect.component.html',
    styleUrls: ['./video-tv-effect.component.scss']
})
export class VideoTvEffectComponent implements OnInit {
    @Input() video: string;
    @Input() glitch: boolean;

    constructor(private element: ElementRef) {
    }

    ngOnInit() {
        const video = this.element.nativeElement.getElementsByClassName('video__player')[0];
        video.muted = true;

        if(this.glitch) {
            setInterval(() => {
                video.currentTime = Math.random() * video.duration;
            }, 1000);
        }
    }

}
