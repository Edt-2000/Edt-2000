import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
    name: 'hacking',
    template: require('./hacking.template'),
    components: {
    }
})

export class HackingComponent extends Vue {
    public $refs: {
        text: HTMLElement,
        character: HTMLElement
    };

    mounted() {
        const response = fetch(new Request("/assets/data/stevencode.txt"));

        response.then((value) => {
            value.text().then((textString) => {
                const textArray: string[] = textString.split('');
                let count: number = 0;

                setInterval(() => {
                    if (textArray[count] === "\n") {
                        this.$refs.text.appendChild(document.createElement("br"));
                    }
                    else {
                        const element: HTMLElement = document.createElement('span');
                        element.classList.add('hacking__character');
                        element.innerHTML = textArray[count];
                        this.$refs.text.appendChild(element);
                    }

                    count++;

                    if (count === textArray.length) {
                        count = 0;
                    }

                }, 30);
            });
        });
    }
}
