<template>
    <div class="page">
        <div class="kaleido" v-bind:style="styles" v-if="!resetAnimation">
            <div class="kaleido__inner">
                <div class="hex"
                     v-for="i in hexagons" v-bind:class="'hex--' + i"
                     v-bind:style="{'animation-delay': (i * kaleidoTime * (1/ hexagons)) + 's' }"
                >
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
import { takeUntil } from 'rxjs/operators';
import { IColor } from '../../../../Shared/colors/types';
import { ColorHelper } from '../../../../Shared/colors/converters';
import { Sizes } from '../../../../Shared/vidt/sizes';

@Component

export default class KaleidoComponent extends Vue {
    public styles: Object = {};
    public hexagons: number = 8;
    public kaleidoTime = 4;
    public resetAnimation = false;

    private onDestroyed: Subject<any> = new Subject();

    mounted() {
        combineLatest([
            Actions$.colorPalette,
            Actions$.glitchIntensity,
            Actions$.size,
        ]).pipe(takeUntil(this.onDestroyed))
            .subscribe(([colors, intensity, size]) => {
                this.resetAnimation = true;

                // If multi amount is same as nr of colors, if default 8
                this.hexagons = size === Sizes.large ? 8 : colors.length;

                // Set animation time depending on intensity
                this.kaleidoTime = 10 - intensity;
                this.styles = {
                    '--animation-kaleido-time': `${ this.kaleidoTime }s`,
                };


                // Set colors
                this.setColors(colors);

                // Re-trigger animation
                setTimeout(() => this.resetAnimation = false);
            });
    }

    setColors(colors: IColor[]) {
        let colorIndex = 0;

        for (let i = 1; i <= 8; i++) {
            const color = `rgb(${ ColorHelper.hsv2rgb(colors[ colorIndex ]).join(', ') }`;
            document.documentElement.style.setProperty(`--kaleido-${ i }`, `${ color }`);

            colorIndex++;

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
