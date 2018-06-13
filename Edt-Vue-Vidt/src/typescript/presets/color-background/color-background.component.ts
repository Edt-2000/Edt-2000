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
    public colorSubscription: any;

    public $refs: {
        color: HTMLElement,
    };
    public animation: Animation|null;

    public colorType: string;
    public pulseDuration: number;
    public rgbColors: number[][] = [];
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

        this.colorSubscription = Actions$.vidtSingleColor
            .subscribe((item) => {
                this.colorType = 'single';
                this.pulseDuration = 0;
                this.rgbColors = [hsv2rgb(item)];
                this.setStyles();

                if (this.pulseDuration !== 0) {
                    this.pulse();
                }
            });
    }

    pulse() {
        requestAnimationFrame(() => {
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
                        duration: this.pulseDuration
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

    setStyles() {
        if (this.animation) {
            this.animation.cancel();
        }

        let bcgColor: string = '';
        if (this.colorType === 'single') {
            bcgColor = `rgb(${this.rgbColors[0].join(', ')})`;
        } else if (this.colorType === 'double') {
            bcgColor = `repeating-linear-gradient(-45deg`;
            let spacing = 0;
            for (const color of this.rgbColors) {
                bcgColor += `, rgb(${color.join(', ')}) ${spacing}px, rgb(${color.join(', ')}) ${spacing + 100}px`;
                spacing += 100;
            }
            bcgColor += ')';
        } else if (this.colorType === 'rainbow') {
            bcgColor = `repeating-linear-gradient(-45deg`;
            const totalColors: number = this.rgbColors.length;
            let spacing = 0;
            let currentIndex: number = 0;

            for (const color of this.rgbColors) {
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
        if (typeof this.colorSubscription !== 'undefined') {
            this.colorSubscription.unsubscribe();
        }
    }
}
