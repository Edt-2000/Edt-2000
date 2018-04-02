import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { GlitchText } from '../../components/glitch-text/glitch-text.component';
import { mapInput } from '../../helpers/map-input';

@Component({
    name: 'logo',
    template: require('./logo.template'),
    components: {
        GlitchText
    }
})

export class Logo extends Vue {
    public stars: number[] = Array(64).map((x, i) => i + 1);
    public level: number = 0;
    public text: string = 'Strobocops';
    public timeOut: number|null;

    mounted() {
        this.fakeInput();

        //unmount > subscribe uit
    }

    fakeInput() {
        document.onkeypress = (e) => {
            const key = e.which;

            if (key >= 49 && key <= 57) {
                this.glitch(key);
            }
        }

        // fkae inpuit > replace by observe intensity
    }

    glitch(input:number) {
        if (this.timeOut) {
            clearTimeout(this.timeOut);
            this.timeOut = null;
            this.level = 0;
        }

        this.level =  mapInput(input,49,57,1, 20);
        this.timeOut = window.setTimeout(() => {
            this.level = 0;
        }, 500);
    }
}
