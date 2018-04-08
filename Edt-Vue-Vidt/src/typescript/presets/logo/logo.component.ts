import Vue from 'vue';
import { Component, Inject } from 'vue-property-decorator';
import { GlitchText } from '../../components/glitch-text/glitch-text.component';
import { mapInput } from '../../helpers/map-input';
import { CommunicationServiceModel } from '../../services/communication.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
    name: 'logo',
    template: require('./logo.template'),
    components: {
        GlitchText
    }
})

export class LogoComponent extends Vue {
    @Inject() communicationService: CommunicationServiceModel;

    public stars: number[] = Array(64).map((x, i) => i + 1);
    public level: number = 0;
    public text: string = 'Strobocops';
    public timeOut: number | null;
    public intensityObservable: Observable<any>;
    public subscription: Subscription;

    constructor() {
        super();
        this.intensityObservable = this.communicationService.intensityObservable;
    }

    mounted() {
        this.subscription = this.intensityObservable
            .map((item) => {
                return item.intensity;
            })
            .subscribe((intensity) => {
                this.glitch(intensity)
            });
    }

    glitch(input: number) {
        if (this.timeOut) {
            clearTimeout(this.timeOut);
            this.timeOut = null;
            this.level = 0;
        }

        this.level = mapInput(input, 1, 9, 1, 20);

        this.decay();
    }

    decay() {
        if(this.timeOut) {
            clearTimeout(this.timeOut);
        }

        this.timeOut = window.setTimeout(() => {
            this.level = Math.ceil(this.level / 2.0);

            if (this.level > 1) {
                this.decay()
            }
        }, 220);
    }

    destroyed() {
        if (typeof this.subscription !== 'undefined') {
            this.subscription.unsubscribe();
        }
    }
}
