import Vue from "vue";
import { Component } from "vue-property-decorator";
import { GlitchText } from "../../components/glitch-text/glitch-text.component";
import { Actions$ } from "../../../../../Shared/actions";

@Component({
    name: "text-bouncer",
    template: require("./text-bouncer.template"),
    components: {
        GlitchText,
    },
})
export class TextBouncerComponent extends Vue {
    public subscription: any;

    public $refs: {
        text: HTMLElement;
    };
    public styles: Object = {};
    public text: string = "bounce";

    public y: number = 0;
    public x: number = 0;
    public minX: number = 0;
    public minY: number = 0;
    public maxX: number;
    public maxY: number;
    public directionX: number = 1;
    public directionY: number = 1;
    public speed: number = 6;

    mounted() {
        this.subscription = Actions$.mainText.subscribe(text => {
            this.text = text;
            // wait for text to be in dom
            requestAnimationFrame(() => {
                this.calculateBoundaries();
            });
        });

        this.calculateBoundaries();

        requestAnimationFrame(() => {
            this.bounce();
        });
    }

    calculateBoundaries() {
        this.maxX = window.innerWidth - this.$refs.text.clientWidth;
        this.maxY = window.innerHeight - this.$refs.text.clientHeight;
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

        this.styles = {
            transform: `translate(${this.x}px,${this.y}px)`,
        };

        requestAnimationFrame(() => {
            this.bounce();
        });
    }

    destroyed() {
        if (typeof this.subscription !== "undefined") {
            this.subscription.unsubscribe();
        }
    }
}
