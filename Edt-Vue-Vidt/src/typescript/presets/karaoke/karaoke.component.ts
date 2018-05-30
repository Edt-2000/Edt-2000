import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import { Actions$ } from '../../../../../Shared/actions';

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

    public styles: Object = {};
    public text: string = 'bounce';

    mounted() {
        this.textSubscription = Actions$.mainText
            .subscribe((text) => {
                this.text = text;

            });

        this.colorSubscription = Actions$.vidtSingleColor
            .subscribe((item) => {
                console.log(item);
                this.styles =  {
                    'color' : this.convertToRGB(item.hue, item.saturation, item.brightness)
                };
            });

    }

    convertToRGB(h: number, s: number, v: number) {
        return convert.hsv.rgb(h, s, v);
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
