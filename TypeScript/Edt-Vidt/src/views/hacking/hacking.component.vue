<template>
    <div class="hacking">
    <pre class="hacking__text" ref="text">
    </pre>
    </div>
</template>

<script lang="ts">
    import "./hacking.scss";
    import Vue from "vue";
    import { Component } from "vue-property-decorator";
    import { stevenCode } from "../../../../Shared/assets/data/stevencode";

    @Component
    export default class HackingComponent extends Vue {
        public $refs: {
            text: HTMLElement;
            character: HTMLElement;
        };

        public interval: number | undefined;

        mounted() {
            const textArray: string[] = stevenCode.split("");
            let count: number = 0;

            this.interval = window.setInterval(() => {
                if (textArray[count] === "\n") {
                    this.$refs.text.appendChild(document.createElement("br"));
                } else {
                    const element: HTMLElement = document.createElement("span");
                    element.classList.add("hacking__character");
                    element.innerHTML = textArray[count];
                    this.$refs.text.appendChild(element);
                }

                count++;

                if (count === textArray.length) {
                    count = 0;
                }
            }, 30);
        }

        destroyed() {
            clearInterval(this.interval);
        }
    }
</script>
