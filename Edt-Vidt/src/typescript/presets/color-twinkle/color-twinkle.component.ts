import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Actions$ } from '../../../../../Shared/actions';
import { IColor } from '../../../../../Shared/socket';
import { hsv2rgb } from '../../helpers/hsv-2-rgb';

@Component({
    name: 'color-twinkle',
    template: require('./color-twinkle.template'),
    components: {
    }
})

export class ColorTwinkleComponent extends Vue {
    public colorSubscription: any;
    public styles: Object = {};
    public $refs: {
        color: HTMLElement,
    };

    public stars: number[] = Array(400).map((x, i) => i + 1);

    mounted() {
        this.colorSubscription = Actions$.vidtSingleColor
            .subscribe((item) => {
                this.setStyles(item);
            });
    }

    setStyles(hsb: IColor) {
        const colorArray = hsv2rgb(hsb);
        this.styles = {
            'color': `rgb(${colorArray.join(', ')})`
        };
    }

    destroyed() {
        if (typeof this.colorSubscription !== 'undefined') {
            this.colorSubscription.unsubscribe();
        }
    }
}
