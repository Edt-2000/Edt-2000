import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component({
    name: 'glitch-text',
    template: require('./glitch-text.template')
})

export class GlitchText extends Vue {
    cssClass: string = '';

    @Prop()
    text: string;

    @Prop()
    level: number;

    @Watch('level')
    setCssClass() {
        this.cssClass = (this.level ? 'glitch-text--level' + this.level : '')
    };
}
