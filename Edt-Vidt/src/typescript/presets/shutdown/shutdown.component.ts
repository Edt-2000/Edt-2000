import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
    name: 'shutdown',
    template: require('./shutdown.template'),
    components: {
    }
})

export class ShutdownComponent extends Vue {

}
