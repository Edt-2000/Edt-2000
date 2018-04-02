import Vue from 'vue';
import Component from 'vue-class-component';
import { Observable } from 'rxjs/Observable';
import { Inject, Provide } from 'vue-property-decorator';
import { communicationService, CommunicationServiceModel } from '../services/communication.service';
import { router } from '../services/router.service';
import 'rxjs/add/operator/map';

@Component({
    name: 'app',
    template: require('./app.template'),
    router: router,
})
export default class App extends Vue {
    @Provide() communicationService: CommunicationServiceModel = communicationService;

    public presetObservable: Observable<any>;
    public intensityObservable: Observable<any>;

    constructor() {
        super();
        this.presetObservable = this.communicationService.presetObservable;
        this.intensityObservable = this.communicationService.intensityObservable;
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

}

