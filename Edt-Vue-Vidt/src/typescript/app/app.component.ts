import Vue from 'vue';
import Component from 'vue-class-component';
import { CommunicationService } from '../services/communication.service';
import { Observable } from 'rxjs/Observable';

@Component({
    name: 'app',
    template: require('./app.template')
})
export default class App extends Vue {
    public communicationService: CommunicationService;
    public communicationObservable: Observable<any>;


    constructor() {
        super();
        this.communicationService = new CommunicationService();
        this.communicationObservable = this.communicationService.socketObservable;
    }
    mounted() {
        this.communicationObservable.subscribe((data) => {
            console.log(data);
        })

    }

}

