import Vue from 'vue';
import Component from 'vue-class-component';
import { Observable } from 'rxjs/Observable';
import { Inject } from 'vue-property-decorator';
import { CommunicationServiceModel } from '../services/communication.service';

@Component({
    name: 'app',
    template: require('./app.template')
})
export default class App extends Vue {
    @Inject() communicationService: CommunicationServiceModel;

    public communicationObservable: Observable<any>;


    constructor() {
        super();
        this.communicationObservable = this.communicationService.socketObservable;
    }

    mounted() {
        this.communicationObservable.subscribe((data) => {
            console.log(data);
        })

    }

}

