<template>
    <div class="photo-glitcher" v-bind:class="'photo-glitcher--' + animation">
        <img class="photo-glitcher__img" v-bind:src="src">
    </div>
</template>

<script lang="ts">
    import './photo-glitcher.scss';
    import Vue from 'vue';
    import { Component } from 'vue-property-decorator';
    import { Actions$ } from '../../../../Shared/actions/actions';
    import { AnimationTypes } from '../../../../Shared/vidt-presets';

    @Component
    export default class PhotoGlitcherComponent extends Vue {
        public animationSubscription: any;
        public photoSubscription: any;

        public animation: string = 'bounce';
        public src: string = '';

        mounted() {
            this.animationSubscription = Actions$.animationType.subscribe(
                animation => {
                    this.animation = AnimationTypes[animation];
                },
            );

            this.photoSubscription = Actions$.imageSrc.subscribe(photo => {
                this.setSrc(photo);
            });
        }

        setSrc(src: string) {
            this.src = `assets/media-by-group/${src}`;
        }

        destroyed() {
            if (typeof this.animationSubscription !== 'undefined') {
                this.animationSubscription.unsubscribe();
            }

            if (typeof this.photoSubscription !== 'undefined') {
                this.photoSubscription.unsubscribe();
            }
        }
    }</script>
