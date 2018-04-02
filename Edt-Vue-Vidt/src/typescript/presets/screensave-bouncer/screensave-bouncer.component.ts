import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { GlitchText } from '../../components/glitch-text/glitch-text.component';

@Component({
    name: 'screensave-bouncer',
    template: require('./screensave-bouncer.template'),
    components: {
        GlitchText
    }
})

export class ScreensaveBouncer extends Vue {
    public text: string = 'bounce';

    public y: number = 0;
    public x: number = 0;
    public minX: number = 0;
    public minY: number = 0;
    public maxX: number;
    public maxY: number;
    public directionX: number = 1;
    public directionY: number = 1;
    public speed: number = 6;
    public $refs: {
        text: HTMLElement
    };
    public styles: Object = {};

    mounted() {
        this.maxX = window.innerWidth - this.$refs.text.clientWidth;
        this.maxY = window.innerHeight - this.$refs.text.clientHeight;
        requestAnimationFrame(() => {
            this.bounce();
        });
    }

    bounce() {
        if (this.x + 1 > this.maxX && this.directionX === 1) {
            this.directionX = -1;
        } else if (this.x - 1 < this.minX && this.directionX === -1) {
            this.directionX = 1;
        }

        if (this.y + 1 > this.maxY && this.directionY === 1) {
            this.directionY = -1;
        } else if (this.y - 1 < this.minY && this.directionY === -1) {
            this.directionY = 1;
        }

        this.x = this.x + this.directionX * this.speed;
        this.y = this.y + this.directionY * this.speed;

        this.styles =  {
            'transform' : `translate(${this.x}px,${this.y}px)`
        };

        requestAnimationFrame(() => {
            this.bounce();
        });
    }
}
