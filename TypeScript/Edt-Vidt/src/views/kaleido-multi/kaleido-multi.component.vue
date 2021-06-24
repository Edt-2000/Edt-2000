<template>
    <div class="page">
        <div class="kaleido" v-bind:style="styles" v-if="!resetAnimation">
            <div class="kaleido__inner">
                <div class="hex" v-for="(color, i) in colors" v-bind:style="{'animation-delay': (i * kaleidoTime * (1/colors.length)) + 's'}">
                    <div class="hex__inner">
                        <div class="hex__sub hex__sub--1" v-bind:style="{'border-color': color}"></div>
                        <div class="hex__sub hex__sub--2" v-bind:style="{'border-color': color}"></div>
                        <div class="hex__sub hex__sub--3" v-bind:style="{'border-color': color}"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import './kaleido-multi.scss';
    import Vue from 'vue';
    import { Component } from 'vue-property-decorator';
    import { combineLatest } from 'rxjs';
    import { Actions$ } from '../../../../Shared/actions/actions';
    import {ColorHelper} from "../../../../Shared/colors/converters";

    @Component

    export default class KaleidoMultiComponent extends Vue {
        public subscription: any;
        public styles = {};
        public colors: string[] = [];
        public kaleidoTime = 4;
        public resetAnimation = false;

        mounted() {
            this.subscription = combineLatest([
                Actions$.colorPalette,
                Actions$.glitchIntensity,
            ]).subscribe(([colors, intensity]) => {
                this.resetAnimation = true;
                this.colors = colors.map(color => {
                    return `rgb(${ ColorHelper.hsv2rgb(color).join(', ')}`;
                });
                this.kaleidoTime = 10 - intensity;
                this.styles = {
                    '--kaleido-time': `${this.kaleidoTime}s`,
                };
                // Re-trigger animation
                setTimeout(() => this.resetAnimation = false);
            });
        }


    }
</script>
