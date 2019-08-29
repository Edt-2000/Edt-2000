import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
    name: 'color-blocks',
    template: require('./color-blocks.template'),
    components: {},
})
export class ColorBlocksComponent extends Vue {

    mounted() {

    }

    destroyed() {

    }
}
