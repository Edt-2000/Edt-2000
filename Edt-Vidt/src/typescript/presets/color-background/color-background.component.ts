import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { IColor } from '../../../../../Shared/socket';
import { Actions$ } from '../../../../../Shared/actions';
import { ColorHelper } from '../../../../../Shared/helpers/hsv-2-rgb';

@Component({
    name: 'color-background',
    template: require('./color-background.template'),
    components: {}
})

export class ColorBackgroundComponent extends Vue {
    public singleColorSubscription: any;
    public multiColorSubscription: any;

    public $refs: {
        color: HTMLElement,
    };
    public animation: Animation | null;
    public styles: Object = {};

    mounted() {
        this.animation = this.$refs.color.animate(
            [
                {
                    opacity: 1
                },
                {
                    opacity: 0
                }
            ], {
                fill: 'forwards',
                easing: 'ease-in',
                duration: 200
            }
        );

        this.animation.pause();

        this.singleColorSubscription = Actions$.vidtSingleColor
            .subscribe((color: IColor) => {
                this.setStyles([color]);
            });

        this.multiColorSubscription = Actions$.vidtMultiColor
            .subscribe((colors: IColor[]) => {
                this.setStyles(colors);
            });
    }

    pulse() {
        requestAnimationFrame((pulseDuration) => {
            if (this.animation) {
                this.animation.cancel();
                this.animation = this.$refs.color.animate(
                    [
                        {
                            opacity: 1
                        },
                        {
                            opacity: 0
                        }
                    ], {
                        fill: 'forwards',
                        easing: 'ease-in',
                        duration: pulseDuration
                    }
                );
            }

            requestAnimationFrame(() => {
                if (this.animation) {
                    this.animation.play();
                }

            });
        });
    }


    setStyles(colors: IColor[]) {
        if (this.animation) {
            this.animation.cancel();
        }

        const bcgColor = ColorHelper.getRGBString(colors);

        this.styles = {
            'background': `${bcgColor}`,
            'opacity': 1
        };

    }

    destroyed() {
        if (typeof this.singleColorSubscription !== 'undefined') {
            this.singleColorSubscription.unsubscribe();
        }

        if (typeof this.multiColorSubscription !== 'undefined') {
            this.multiColorSubscription.unsubscribe();
        }
    }
}
