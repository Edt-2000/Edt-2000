import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import { Actions$ } from '../../../../../Shared/actions';
import { IColor } from '../../../../../Shared/socket';

const convert = require('color-convert');

@Component({
    name: 'karaoke',
    template: require('./karaoke.template'),
    components: {
    }
})

export class KaraokeComponent extends Vue {
    public textSubscription: any;
    public colorSubscription: any;

    public $refs: {
        text: HTMLElement
    };

    public cssClass: string = '';
    public styles: Object = {};
    public text: string = 'bounce';

    mounted() {
        this.textSubscription = Actions$.mainText
            .subscribe((text) => {
                //if same bounce
                if (this.text === text) {
                    this.text = text;
                    // wait for text to be in dom
                    requestAnimationFrame(() => {
                        this.cssClass = 'is-hidden';

                        window.setTimeout(() => {
                            this.cssClass = '';
                        }, 150)
                    });
                } else {
                    this.text = text;
                }
            });

        this.colorSubscription = Actions$.vidtSingleColor
            .subscribe((item) => {
                this.setStyles(item);
            });

    }

    convertToRGB(h: number, s: number, v: number) {
        return convert.hsv.rgb(h, s, v);
    }

    setStyles(hsb: IColor) {
        const colorArray = this.convertToRGB(hsb.hue, hsb.saturation, hsb.brightness);
        this.styles = {
            'color': `rgb(${colorArray.join(', ')})`
        };
    }

    destroyed() {
        if (typeof this.textSubscription !== 'undefined') {
            this.textSubscription.unsubscribe();
        }

        if (typeof this.colorSubscription !== 'undefined') {
            this.colorSubscription.unsubscribe();
        }
    }
}
