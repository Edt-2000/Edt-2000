<template>
    <div class="photo-bouncer">
        <img class="photo-bouncer__img" ref="img" v-bind:src="src">
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component } from "vue-property-decorator";
    import { Actions$ } from "../../../../Shared/actions";

    @Component
    export default class PhotoBouncerComponent extends Vue {
        public beatSubscription: any;
        public photoSubscription: any;

        public $refs: {
            img: HTMLElement;
        };

        public animation: Animation;
        public src: string = "";

        mounted() {
            this.animation = this.$refs.img.animate(
                [
                    {
                        transform: "scale(1)",
                    },
                    {
                        transform: "scale(1.5)",
                    },
                    {
                        transform: "scale(1)",
                    },
                ],
                {
                    easing: "linear",
                    duration: 200,
                },
            );

            this.animation.pause();

            this.beatSubscription = Actions$.vidtBeat.subscribe(() => {
                this.animate();
            });

            this.photoSubscription = Actions$.imageSrc.subscribe(photo => {
                this.setSrc(photo);
            });
        }

        setSrc(src: string) {
            this.src = `assets/media-by-group/${src}`;
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
            if (typeof this.beatSubscription !== "undefined") {
                this.beatSubscription.unsubscribe();
            }

            if (typeof this.photoSubscription !== "undefined") {
                this.photoSubscription.unsubscribe();
            }
        }
    }</script>
