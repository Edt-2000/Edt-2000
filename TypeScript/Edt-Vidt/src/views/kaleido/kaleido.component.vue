<template>
    <div class="page">
        <div class="kaleido" v-bind:style="styles">
            <div class="kaleido__inner">
                <div class="hex" v-for="hex in hexagons" v-bind:class="'hex--' + hex">
                    <div class="hex__inner">
                        <div class="hex__sub hex__sub--1"></div>
                        <div class="hex__sub hex__sub--2"></div>
                        <div class="hex__sub hex__sub--3"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import './kaleido.scss';
    import Vue from 'vue';
    import { Component } from 'vue-property-decorator';
    import { combineLatest, Subject } from 'rxjs';
    import { Actions$ } from '../../../../Shared/actions/actions';
    import { filter, startWith, takeUntil } from 'rxjs/operators';
    import { IColor } from '../../../../Shared/colors/types';
    import { ColorHelper } from '../../../../Shared/colors/converters';

    @Component

    export default class KaleidoComponent extends Vue {
        public styles: Object = {};
        public hexagons: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

        private onDestroyed: Subject<any> = new Subject();

        mounted() {
            Actions$.glitchIntensity
                .pipe(
                    takeUntil(this.onDestroyed),
                    filter(intensity => !!intensity)
                ).subscribe((intensity) => {
                    this.styles = {
                        '--animation-kaleido-time': `${ 10- intensity }s`,
                    };
                });

            Actions$.colorPalette
                .pipe(
                    takeUntil(this.onDestroyed),
                    filter(colors => !!colors && colors.length > 0)
                ).subscribe((colors: IColor[]) => {
                    this.setColors(colors);
            });
        }

        setColors(colors: IColor[]) {
            let colorIndex = 0;

            for (let i = 1; i <= 8; i++) {
                const color = `rgb(${ ColorHelper.hsv2rgb(colors[colorIndex]).join(', ')}`;
                document.documentElement.style.setProperty(`--kaleido-${ i }`, `${ color }`);

                colorIndex ++;

                if (colorIndex == colors.length) {
                    colorIndex = 0;
                }
            }
        }

        destroyed() {
            this.onDestroyed.next();
            this.onDestroyed.complete();
        }

    }
</script>
