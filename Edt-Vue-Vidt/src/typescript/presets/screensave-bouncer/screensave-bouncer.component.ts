import Vue from 'vue';
import { Component, Inject } from 'vue-property-decorator';
import { GlitchText } from '../../components/glitch-text/glitch-text.component';
import { Observable } from 'rxjs/Observable';
import { CommunicationServiceModel } from '../../services/communication.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    name: 'screensave-bouncer',
    template: require('./screensave-bouncer.template'),
    components: {
        GlitchText
    }
})

export class ScreensaveBouncerComponent extends Vue {
    @Inject() communicationService: CommunicationServiceModel;

    public text: string = 'bounce';
    public textObservable: Observable<any>;
    public subscription: Subscription;

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

    constructor() {
        super();
        this.textObservable = this.communicationService.textObservable;
    }

    mounted() {
        this.subscription = this.textObservable
            .map((item) => {
                return item.text;
            })
            .subscribe((text) => {
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

        this.styles =  {
            'transform' : `translate(${this.x}px,${this.y}px)`
        };

        requestAnimationFrame(() => {
            this.bounce();
        });
    }


    destroyed() {
        if (typeof this.subscription !== 'undefined') {
            this.subscription.unsubscribe();
        }
    }
}
