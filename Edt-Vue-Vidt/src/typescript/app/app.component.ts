import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import Vue from 'vue';
import Component from 'vue-class-component';
import { Provide } from 'vue-property-decorator';

import { communicationService, ICommunicationService } from '../services/communication.service';
import { router } from '../services/router.service';

@Component({
    name: 'app',
    template: require('./app.template'),
    router: router,
})
export default class App extends Vue {
    @Provide() communicationService: ICommunicationService = communicationService;

    public presetObservable: Observable<any>;
    public subscription: Subscription;

    constructor() {
        super();
        this.presetObservable = this.communicationService.presetObservable;
    }

    mounted() {
        this.presetObservable
            .map((item) => {
                return item.preset.path;
            })
            .subscribe((path) => {
                router.push(path);
            });
    }

    destroyed() {
        if (typeof this.subscription !== 'undefined') {
            this.subscription.unsubscribe();
        }
    }

}

