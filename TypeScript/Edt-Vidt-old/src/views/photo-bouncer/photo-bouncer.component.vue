<template>
    <div class="photo-bouncer">
        <img class="photo-bouncer__img" ref="img" v-bind:src="src">
    </div>
</template>

<script lang="ts">
import './photo-bouncer.scss';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Actions$ } from '../../../../Shared/actions/actions';
import { AnimationTypes } from '../../../../Shared/vidt/animation';

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

        private currentAnimation: AnimationTypes = AnimationTypes.bounce;

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
                    offset: 0,
                    transform: 'scaleX(1)',
                },
                {
                    offset: 0.49,
                    transform: 'scaleX(1)',
                },
                {
                    offset: 0.5,
                    transform: 'scaleX(-1)',
                },
                {
                    offset: 0.99,
                    transform: 'scaleX(-1)',
                },
                {
                    offset: 1,
                    transform: 'scaleX(1)',
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
                // fill: 'forwards',
                duration: 600,
            },
        };

        mounted() {
            this.setAnimation(AnimationTypes.bounce);

            this.animationSubscription = Actions$.animationType.subscribe(
                animation => {
                    if (animation !== this.currentAnimation && this.animations[animation]) {
                        this.setAnimation(animation);
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
            this.src = `./assets/media-by-group/${src}`;
        }

        setAnimation(type: AnimationTypes) {
            this.currentAnimation = type;

            if (this.animation) {
                this.animation.cancel();
            }

            this.animation = this.$refs.img.animate(
                this.animations[AnimationTypes[type]],
                this.animationsConfig[AnimationTypes[type]],
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
