import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {Actions$} from '../../../../../Shared/actions';
import {IColor} from '../../../../../Shared/types';
import {ColorHelper} from '../../../../../Shared/helpers/hsv-2-rgb';

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
            .subscribe((color: IColor) => {
                this.setStyles([color]);
            });

    }

    convertToRGB(h: number, s: number, v: number) {
        return convert.hsv.rgb(h, s, v);
    }

    setStyles(colors: IColor[]) {
        const bcgColor = ColorHelper.getRGBString(colors);

        this.styles = {
            'color': `${bcgColor}`
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
