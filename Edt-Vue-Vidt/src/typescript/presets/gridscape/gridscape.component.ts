import Vue from 'vue';
import { Component, Inject } from 'vue-property-decorator';
import { CommunicationServiceModel } from '../../services/communication.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
    name: 'gridscape',
    template: require('./gridscape.template'),
    components: {
    }
})

export class GridscapeComponent extends Vue {
    @Inject() communicationService: CommunicationServiceModel;

    public $refs: {
        sun: HTMLElement,
    };

    public beatObservable: Observable<any>;
    public subscription: Subscription;

    public linesVertical = Array(80).map((x, i) => i + 1);
    public linesHorizontal = Array(10).map((x, i) => i + 1);
    public stars = Array(40).map((x, i) => i + 1);

    public bounce: boolean = false;
    public animation: Animation;

    constructor() {
        super();
        this.beatObservable = this.communicationService.beatObservable;
    }

    mounted() {
        this.animation = this.$refs.sun.animate(
            [
                {
                    transform: 'translate(-50%, -62%) scale(1)'
                },
                {
                    transform: 'translate(-50%, -62%) scale(1.2)'
                },
                {
                    transform: 'translate(-50%, -62%) scale(1)'
                }
            ], {
                easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
                duration: 200
            }
        );

        this.animation.pause();

        this.subscription = this.beatObservable
            .map((item) => {
                return item.beat === true;
            })
            .subscribe((beat) => {
                this.animate();
            });
    }

    animate() {
        requestAnimationFrame(() => {
            if (this.animation.playState === 'running') {
                this.animation.cancel();
            }

            requestAnimationFrame(() => {
                this.animation.play();
            });
        });
    }

    destroyed() {
        if (typeof this.subscription !== 'undefined') {
            this.subscription.unsubscribe();
        }
    }
}
