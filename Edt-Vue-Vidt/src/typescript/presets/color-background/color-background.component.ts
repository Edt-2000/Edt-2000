import Vue from 'vue';
import { Component, Inject } from 'vue-property-decorator';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { IBeatMsg, ISingleColorMsg } from '../../../../../Shared/socket';
import { ICommunicationService } from '../../services/communication.service';
const convert = require('color-convert');

@Component({
    name: 'color-background',
    template: require('./color-background.template'),
    components: {
    }
})

export class ColorBackgroundComponent extends Vue {
    @Inject() communicationService: ICommunicationService;

    public colorObservable: Observable<ISingleColorMsg> = this.communicationService.colorObservable;
    public colorSubscription: Subscription;

    public $refs: {
        color: HTMLElement,
    };
    public animation: Animation|null;

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

        this.colorSubscription = this.colorObservable
            .subscribe((item: ISingleColorMsg) => {
                this.pulseDuration = item.duration * 100;
                this.saveColors(item);
                this.setStyles();

                if (this.pulseDuration !== 0) {
                    this.pulse();
                }
            });
    }

    saveColors(item: ISingleColorMsg) {
        // reset array
        this.rgbColors = [];
        for (const hue of item.hues) {
            const rgb = this.convertToRGB(hue, item.saturation, item.value);
            this.rgbColors.push(rgb);
        }
    }

    convertToRGB(h: number, s: number, v: number) {
        return convert.hsv.rgb(h, s, v);
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
        if (this.rgbColors.length > 1) {
            bcgColor = `repeating-linear-gradient(-45deg`;
            let spacing = 0;
            for (const color of this.rgbColors) {
                bcgColor += `, rgb(${color.join(', ')}) ${spacing}px, rgb(${color.join(', ')}) ${spacing + 100}px`;
                spacing += 100;
            }
            bcgColor += ')';

        } else if (this.rgbColors.length >= 1) {
            bcgColor = `rgb(${this.rgbColors[0].join(', ')})`;
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
