<template>
    <div class="logo">
        <div class="logo__stars">
            <div class="logo__star" v-for="star in stars"></div>
        </div>
        <div class="logo__text">
            <glitch-text v-bind:level="level" v-bind:text="text"></glitch-text>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component } from "vue-property-decorator";
    import GlitchText from "../../components/glitch-text/glitch-text.component.vue";
    import { Actions$ } from "../../../../Shared/actions";
    import { mapInput } from "../../../../Shared/helpers/map-input";
    import { withLatestFrom } from "rxjs/operators";

    @Component({
        components: {
            GlitchText,
        },
    })
    export default class LogoComponent extends Vue {
        public subscription: any;

        public stars: number[] = Array(64).map((x, i) => i + 1);
        public level: number = 0;
        public text: string = "Strobocops";
        public timeOut: number | null;

        mounted() {
            this.subscription = Actions$.vidtBeat
                .pipe(withLatestFrom(Actions$.glitchIntensity))
                .subscribe(([beat, intensity]) => {
                    this.glitch(intensity);
                });
        }

        glitch(input: number) {
            if (this.timeOut) {
                clearTimeout(this.timeOut);
                this.timeOut = null;
                this.level = 0;
            }

            this.level = mapInput(input, 1, 9, 1, 20);

            this.decay();
        }

        decay() {
            if (this.timeOut) {
                clearTimeout(this.timeOut);
            }

            this.timeOut = window.setTimeout(() => {
                this.level = Math.ceil(this.level / 2.0);

                if (this.level > 1) {
                    this.decay();
                }
            }, 220);
        }

        destroyed() {
            if (typeof this.subscription !== "undefined") {
                this.subscription.unsubscribe();
            }
        }
    }
</script>
