<template>
    <div class="video">
        <video class="video__player" loop muted ref="video">
            <source type="video/mp4" v-bind:src="src">
        </video>

        <div class="video__overlay" v-if="overlay"></div>
    </div>
</template>

<script lang="ts">
    import './video-player.scss';
    import Vue from 'vue';
    import { Component } from 'vue-property-decorator';
    import { Actions$ } from '../../../../Shared/actions/actions';

    @Component
    export default class VideoPlayerComponent extends Vue {
        public beatSubscription: any;
        public videoSubscription: any;

        public src: string = '';
        public interval: number;
        public overlay: boolean = false;
        public $refs: {
            video: HTMLVideoElement;
        };

        mounted() {
            this.videoSubscription = Actions$.videoSrc.subscribe(
                (video: string) => {
                    this.setSrc(video);
                    this.playVideo();
                },
            );

            this.beatSubscription = Actions$.mainBeat.subscribe(() => {
                this.glitchVideo();
            });
        }

        setSrc(src: string) {
            this.src = `assets/media-by-group/${src}`;
        }

        playVideo() {
            if (this.interval) {
                clearInterval(this.interval);
            }
            this.$refs.video.load();
            this.$refs.video.muted = true; // fix for muted attr bug
            this.$refs.video.play();
        }

        glitchVideo() {
            if (this.interval) {
                clearInterval(this.interval);
            }

            this.$refs.video.currentTime =
                Math.random() * this.$refs.video.duration;
        }

        glitchVideoContinuous() {
            this.interval = window.setInterval(() => {
                this.$refs.video.currentTime =
                    Math.random() * this.$refs.video.duration;
            }, 1000);
        }

        destroyed() {
            if (typeof this.beatSubscription !== 'undefined') {
                this.beatSubscription.unsubscribe();
            }

            if (typeof this.videoSubscription !== 'undefined') {
                this.videoSubscription.unsubscribe();
            }

            if (this.interval) {
                clearInterval(this.interval);
            }
        }
    }</script>
