import Vue from 'vue';
import { Component, Inject } from 'vue-property-decorator';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { IBeatMsg, IVideoMsg } from '../../../../../Shared/socket';
import { ICommunicationService } from '../../services/communication.service';
import { IVideoAsset, videoAssets } from '../../../../../Shared/assets';

@Component({
    name: 'video-player',
    template: require('./video-player.template'),
    components: {
    }
})

export class VideoPlayerComponent extends Vue {
    @Inject() communicationService: ICommunicationService;

    public beatObservable: Observable<IBeatMsg> = this.communicationService.beatObservable;
    public videoObservable: Observable<IVideoMsg> = this.communicationService.videoObservable;
    public beatSubscription: Subscription;
    public videoSubscription: Subscription;

    public videoAssets: IVideoAsset[] = videoAssets;
    public video: IVideoAsset;
    public src: string = '';
    public interval: number;
    public $refs : {
        video: HTMLVideoElement
    };

    mounted() {
        this.video = this.videoAssets[0];
        this.setSrc();
        this.playVideo();
        this.glitchVideoContinuous();

        this.videoSubscription = this.videoObservable
            .map((item: IVideoMsg) => {
                return item.video;
            })
            .subscribe((video: IVideoAsset) => {
                this.video = video;
                this.setSrc();
                this.playVideo();
            });

        this.beatSubscription = this.beatObservable
            .map((item: IBeatMsg) => {
                return item.beat === true;
            })
            .subscribe(() => {
                this.glitchVideo();
            });
    }

    setSrc() {
        this.src = `assets/video/${this.video.src}`;
    }

    showOverlay() {
        return (this.video && this.video.overlay);
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
