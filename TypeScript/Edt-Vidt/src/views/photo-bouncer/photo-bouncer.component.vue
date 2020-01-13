<template>
    <div class="photo-bouncer">
        <img class="photo-bouncer__img" ref="img" v-bind:src="src">
    </div>
</template>

<script lang="ts">
    import './photo-bouncer.scss';
    import Vue from 'vue';
    import { Component } from 'vue-property-decorator';
    import { Actions$ } from '../../../../Shared/actions';
    import { AnimationTypes } from '../../../../Shared/vidt-presets';

    @Component
    export default class PhotoBouncerComponent extends Vue {
        public animationSubscription: any;
        public beatSubscription: any;
        public photoSubscription: any;

        public $refs: {
            img: HTMLElement;
        };

        public animation: Animation;
        public src: string = '';

        private currentAnimation: string = 'bounce';

        private animations = {
            'bounce': [
                {
                    transform: 'scale(1)',
                },
                {
                    transform: 'scale(1.5)',
                },
                {
                    transform: 'scale(1)',
                },
            ],
            'mirror': [
                {
                    transform: 'scaleX(1)',
                },
                {
                    transform: 'scaleX(-1)',
                },
            ],
        };

        private animationsConfig = {
            'bounce': {
                easing: 'linear',
                duration: 200,
            },
            'mirror': {
                easing: 'linear',
                fill: 'forwards',
                duration: 0,
            },
        };

        mounted() {
            this.setAnimation('bounce');

            this.animationSubscription = Actions$.animationType.subscribe(
                animation => {
                    if (AnimationTypes[AnimationTypes[animation]] !== this.currentAnimation && this.animations[AnimationTypes[AnimationTypes[animation]]]) {
                        this.setAnimation(AnimationTypes[AnimationTypes[animation]]);
                    }
                },
            );

            this.beatSubscription = Actions$.mainBeat.subscribe(() => {
                this.animate();
            });

            this.photoSubscription = Actions$.imageSrc.subscribe(photo => {
                this.setSrc(photo);
            });
        }

        setSrc(src: string) {
            this.src = `assets/media-by-group/${src}`;
        }

        setAnimation(type: string) {
            this.currentAnimation = type;

            if (this.animation) {
                this.animation.cancel();
            }

            this.animation = this.$refs.img.animate(
                this.animations[type],
                this.animationsConfig[type],
            );
        }

        animate() {
            requestAnimationFrame(() => {
                if (this.animation.playState === 'running') {
                    this.animation.finish();
                }

                requestAnimationFrame(() => {
                    this.animation.play();
                    this.animation.reverse();
                });
            });
        }

        destroyed() {
            if (typeof this.animationSubscription !== 'undefined') {
                this.animationSubscription.unsubscribe();
            }

            if (typeof this.beatSubscription !== 'undefined') {
                this.beatSubscription.unsubscribe();
            }

            if (typeof this.photoSubscription !== 'undefined') {
                this.photoSubscription.unsubscribe();
            }
        }
    }</script>
