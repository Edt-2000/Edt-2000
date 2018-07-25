import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {photoAssets} from '../../../../../Shared/assets';
import {Actions$} from '../../../../../Shared/actions';
import {animationTypes} from '../../../../../Shared/vidt-presets';

@Component({
    name: 'photo-glitcher',
    template: require('./photo-glitcher.template'),
    components: {
    }
})

export class PhotoGlitcherComponent extends Vue {
    public animationSubscription: any;
    public photoSubscription: any;

    public animation: string = 'bounce';
    public src: string = '';

    mounted() {
        this.setSrc(photoAssets[0].src);

        this.animationSubscription = Actions$.animationType
            .subscribe((animation) => {
                this.animation = animation;
            });

        this.photoSubscription = Actions$.imageSrc
            .subscribe((photo) => {
                this.setSrc(photo.src);
            });
    }

    setSrc(src: string) {
        this.src = `assets/img/photoassets/${src}`;
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
