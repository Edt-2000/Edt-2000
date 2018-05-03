import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {IVideoAsset} from '../../../../../Shared/assets';
import {Actions$} from '../../../../../Shared/actions';

@Component({
    name: 'video-player',
    template: require('./video-player.template'),
    components: {
    }
})

export class VideoPlayerComponent extends Vue {
    public beatSubscription: any;
    public videoSubscription: any;

    public src: string = '';
    public interval: number;
    public overlay: boolean = true;
    public $refs : {
        video: HTMLVideoElement
    };

    mounted() {
        this.videoSubscription = Actions$.videoSrc
            .subscribe((video: IVideoAsset) => {
                this.setSrc(video.src);
                this.setOverlay(video.overlay);
                this.playVideo();
            });

        this.beatSubscription = Actions$.mainBeat
            .subscribe(() => {
                this.glitchVideo();
            });
    }

    setSrc(src: string) {
        this.src = `assets/video/${src}`;
    }

    setOverlay(state: boolean) {
        this.overlay = state;
    }

    playVideo() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.$refs.video.load();
        this.$refs.video.muted = true; // fix for muted attr bug
        this.$refs.video.play();
    }

    glitchVideo() {
        if (this.interval) {
            clearInterval(this.interval);
        }

        this.$refs.video.currentTime = Math.random() * this.$refs.video.duration;
    }

    glitchVideoContinuous() {
        this.interval = window.setInterval(() => {
            this.$refs.video.currentTime = Math.random() * this.$refs.video.duration;
        }, 1000);
    }

    destroyed() {
        if (typeof this.beatSubscription !== 'undefined') {
            this.beatSubscription.unsubscribe();
        }

        if (typeof this.videoSubscription !== 'undefined') {
            this.videoSubscription.unsubscribe();
        }

        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}
