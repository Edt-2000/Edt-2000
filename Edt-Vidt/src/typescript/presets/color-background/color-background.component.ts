import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {IColor} from '../../../../../Shared/socket';
import {Actions$} from '../../../../../Shared/actions';
import { hsv2rgb } from '../../helpers/hsv-2-rgb';

@Component({
    name: 'color-background',
    template: require('./color-background.template'),
    components: {
    }
})

export class ColorBackgroundComponent extends Vue {
    public singleColorSubscription: any;
    public multiColorSubscription: any;

    public $refs: {
        color: HTMLElement,
    };
    public animation: Animation|null;
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

                const rgbColors = this.getRGBColors([color]);
                this.setStyles(rgbColors);
            });

        this.multiColorSubscription = Actions$.vidtMultiColor
            .subscribe((colors: IColor[]) => {
                const rgbColors = this.getRGBColors(colors);
                this.setStyles(rgbColors);
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

    getRGBColors(colors: IColor[]) {
        return colors.map((color) => {
            return hsv2rgb(color);
        })
    }

    setStyles(rgbColors: number[][]) {
        if (this.animation) {
            this.animation.cancel();
        }

        let bcgColor: string = '';
        if (rgbColors.length === 1) {
            bcgColor = `rgb(${rgbColors[0].join(', ')})`;
        }
        else {
            bcgColor = `repeating-linear-gradient(-45deg`;
            const totalColors: number = rgbColors.length;
            let spacing = 0;
            let currentIndex: number = 0;

            for (const color of rgbColors) {
                const percentage = (100 / totalColors) * currentIndex;
                const percentageNext = (100 / totalColors) * ++currentIndex;
                bcgColor += `, rgb(${color.join(', ')}) ${percentage}%, rgb(${color.join(', ')}) ${percentageNext}%`;
                spacing += 100;
            }

            bcgColor += ')';
        }

        this.styles =  {
            'background' : `${bcgColor}`,
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
