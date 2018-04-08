import Vue from 'vue';
import { Component, Inject } from 'vue-property-decorator';
import { ICommunicationService } from '../../services/communication.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { IBeatMsg, IPhotoMsg } from '../../../../../Shared/socket';
import { photoAssets, IPhotoAsset } from '../../../../../Shared/assets';

@Component({
    name: 'photo-bouncer',
    template: require('./photo-bouncer.template'),
    components: {
    }
})

export class PhotoBouncerComponent extends Vue {
    @Inject() communicationService: ICommunicationService;

    public beatObservable: Observable<IBeatMsg>;
    public photoObservable: Observable<IPhotoMsg>;
    public beatSubscription: Subscription;
    public photoSubscription: Subscription;

    public $refs: {
        img: HTMLElement,
    };

    public photoAssets: IPhotoAsset[] = photoAssets;
    public photo: IPhotoAsset = this.photoAssets[8];
    public animation: Animation;

    constructor() {
        super();
        this.beatObservable = this.communicationService.beatObservable;
        this.photoObservable = this.communicationService.photoObservable;
    }

    mounted() {

        this.animation = this.$refs.img.animate(
            [
                {
                    transform: 'scale(1)'
                },
                {
                    transform: 'scale(1.5)'
                },
                {
                    transform: 'scale(1)'
                }
            ], {
                easing: 'linear',
                duration: 200
            }
        );

        this.animation.pause();

        this.beatSubscription = this.beatObservable
            .map((item: IBeatMsg) => {
                return item.beat === true;
            })
            .subscribe(() => {
                this.animate();
            });

        this.photoSubscription = this.photoObservable
            .map((item: IPhotoMsg) => {
                return item.photo;
            })
            .subscribe((photo: IPhotoAsset) => {
                this.photo = photo
            });
    }


    animate() {
        requestAnimationFrame(() => {
            if (this.animation.playState === 'running') {
                this.animation.cancel();
            }

            requestAnimationFrame(() => {
                this.animation.play();
            });
        });
    }

    switchPhoto(photo: IPhotoAsset) {
        if (!photo) {
            this.photo = this.photoAssets[0];
        } else {
            this.photo = photo;
        }
    }


    destroyed() {
        if (typeof this.beatSubscription !== 'undefined') {
            this.beatSubscription.unsubscribe();
        }

        if (typeof this.photoSubscription !== 'undefined') {
            this.photoSubscription.unsubscribe();
        }
    }
}
