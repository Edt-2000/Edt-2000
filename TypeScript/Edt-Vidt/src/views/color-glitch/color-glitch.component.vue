<template>
    <div class="color-glitch" v-bind:style="{ '--first-color': firstColor, '--second-color': secondColor }"></div>
</template>

<script lang="ts">
import "./color-glitch.scss";

import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Actions$ } from '../../../../Shared/actions/actions';
import { IColor } from '../../../../Shared/colors/types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColorHelper } from '../../../../Shared/colors/converters';

@Component
export default class ColorGlitchComponent extends Vue {
    public firstColor: string = '#ff179a';
    public secondColor: string = '#16de00';

    private onDestroyed: Subject<any> = new Subject();

    mounted() {
        Actions$.vidtSingleColor
            .pipe(takeUntil(this.onDestroyed))
            .subscribe(
            (color: IColor) => {
                this.setColors(color, ColorHelper.getContraColor(color));
            },
        );
        //
        // Actions$.vidtMultiColor
        //     .pipe(takeUntil(this.onDestroyed))
        //     .subscribe((colors: IColor[]) => {
        //         console.log('mutli', colors);
        //
        //         if (colors.length > 1) {
        //             this.setColors(colors[0], colors[colors.length]);
        //         } else {
        //             this.setColors(colors[0], ColorHelper.getContraColor(colors[0]));
        //
        //         }
        //     });
    }

    setColors(first: IColor, second: IColor) {
        this.firstColor = `rgb(${ ColorHelper.hsv2rgb(first).join(', ')}`;
        this.secondColor = `rgb(${ ColorHelper.hsv2rgb(second).join(', ')}`;
    }

    destroyed() {
        this.onDestroyed.next();
        this.onDestroyed.complete();
    }
}
</script>

