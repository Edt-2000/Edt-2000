<template>
    <div class="gridscape">
        <div class="gridscape__horizon">
            <div class=gridscape__star v-for="star in stars"></div>
            <div class="gridscape__sun" ref="sun">
            </div>
        </div>
        <div class="gridscape__land">
            <div class="gridscape__lines-horizontal">
                <div class="gridscape__line-horizontal" v-for="line in linesHorizontal"></div>
            </div>
            <div class="gridscape__lines-vertical">
                <div class="gridscape__line-vertical" v-for="line in linesVertical"></div>
            </div>
            <div class="gridscape__overlay"></div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component } from "vue-property-decorator";
    import { Actions$ } from "../../../../Shared/actions";

    @Component
    export default class GridscapeComponent extends Vue {
        public subscription: any;

        public $refs: {
            sun: HTMLElement;
        };

        public linesVertical = Array(80).map((x, i) => i + 1);
        public linesHorizontal = Array(10).map((x, i) => i + 1);
        public stars = Array(40).map((x, i) => i + 1);

        public bounce: boolean = false;
        public animation: Animation;

        mounted() {
            this.animation = this.$refs.sun.animate(
                [
                    {
                        transform: "translate(-50%, -62%) scale(1)",
                    },
                    {
                        transform: "translate(-50%, -62%) scale(1.2)",
                    },
                    {
                        transform: "translate(-50%, -62%) scale(1)",
                    },
                ],
                {
                    easing: "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
                    duration: 200,
                },
            );

            this.animation.pause();

            this.subscription = Actions$.vidtBeat.subscribe(() => {
                this.animate();
            });
        }

        animate() {
            requestAnimationFrame(() => {
                if (this.animation.playState === "running") {
                    this.animation.cancel();
                }

                requestAnimationFrame(() => {
                    this.animation.play();
                });
            });
        }

        destroyed() {
            if (typeof this.subscription !== "undefined") {
                this.subscription.unsubscribe();
            }
        }
    }
</script>
