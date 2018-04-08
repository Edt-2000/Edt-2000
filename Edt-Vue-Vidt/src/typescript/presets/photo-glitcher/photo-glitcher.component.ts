import Vue from 'vue';
import { Component, Inject } from 'vue-property-decorator';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ICommunicationService } from '../../services/communication.service';
import { IPhotoAsset, photoAssets } from '../../../../../Shared/assets';
import { IAnimationMsg, IPhotoMsg } from '../../../../../Shared/socket';

@Component({
    name: 'photo-glitcher',
    template: require('./photo-glitcher.template'),
    components: {
    }
})

export class PhotoGlitcherComponent extends Vue {
    @Inject() communicationService: ICommunicationService;

    public animationObservable: Observable<IAnimationMsg> = this.communicationService.animationObservable;
    public photoObservable: Observable<IPhotoMsg> = this.communicationService.photoObservable;
    public animationSubscription: Subscription;
    public photoSubscription: Subscription;

    public photoAssets: IPhotoAsset[] = photoAssets;
    public photo: IPhotoAsset;
    public animation: string = 'bounce';
    public src: string = '';

    mounted() {
        this.photo = this.photoAssets[8];
        this.setSrc();

        this.animationSubscription = this.animationObservable
            .map((item: IAnimationMsg) => {
                return item.animation;
            })
            .subscribe((animation) => {
                console.log(animation);
                this.animation = animation;
            });

        this.photoSubscription = this.photoObservable
            .map((item: IPhotoMsg) => {
                return item.photo;
            })
            .subscribe((photo: IPhotoAsset) => {
                this.photo = photo;
                this.setSrc();
            });
    }

    setSrc() {
        this.src = `assets/img/photoassets/${this.photo.src}`;
    }

    destroyed() {
        if (typeof this.animationSubscription !== 'undefined') {
            this.animationSubscription.unsubscribe();
        }

        if (typeof this.photoSubscription !== 'undefined') {
            this.photoSubscription.unsubscribe();
        }
    }
}
