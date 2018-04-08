import Vue from 'vue';
import Component from 'vue-class-component';
import { Observable } from 'rxjs/Observable';
import { Inject, Provide } from 'vue-property-decorator';
import { communicationService, CommunicationServiceModel } from '../services/communication.service';
import { router } from '../services/router.service';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';

@Component({
    name: 'app',
    template: require('./app.template'),
    router: router,
})
export default class App extends Vue {
    @Provide() communicationService: CommunicationServiceModel = communicationService;

    public presetObservable: Observable<any>;
    public subscription: Subscription;

    constructor() {
        super();
        this.presetObservable = this.communicationService.presetObservable;
    }

    mounted() {
        this.presetObservable
            .map((item) => {
                return item.preset;
            })
            .subscribe((preset) => {
                router.push(preset);
            });
    }

    destroyed() {
        if (typeof this.subscription !== 'undefined') {
            this.subscription.unsubscribe();
        }
    }

}

