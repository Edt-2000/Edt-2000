<template>
    <div class="page" v-bind:style="{ '--first-color': firstColor, '--second-color': secondColor }">
        <div class="wheel">
            <div class="wheel__circle">
                <div class="wheel__inner">
                </div>
            </div>
            <div class="wheel__circle">
                <div class="wheel__inner">
                </div>
            </div>
            <div class="wheel__circle">
                <div class="wheel__inner">
                </div>
            </div>
            <div class="wheel__circle">
                <div class="wheel__inner">
                </div>
            </div>
            <div class="wheel__circle">
                <div class="wheel__inner">
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import './wheel.scss';
    import Vue from 'vue';
    import { Component } from 'vue-property-decorator';
    import { Actions$ } from '../../../../Shared/actions/actions';
    import { takeUntil } from 'rxjs/operators';
    import { IColor } from '../../../../Shared/colors/types';
    import { ColorHelper } from '../../../../Shared/colors/converters';
    import { Subject } from 'rxjs';

    @Component

    export default class WheelComponent extends Vue {

        public firstColor: string = '#ff0000';
        public secondColor: string = '#00ff00';

        private onDestroyed: Subject<any> = new Subject();

        mounted() {
            Actions$.vidtSingleColor
                .pipe(takeUntil(this.onDestroyed))
                .subscribe((color: IColor) => {
                    this.setColors(color, ColorHelper.getContraColor(color));
                });

            Actions$.vidtMultiColor
                .pipe(takeUntil(this.onDestroyed))
                .subscribe((colors: IColor[]) => {
                    if (colors.length > 1) {
                        this.setColors(colors[0], colors[colors.length]);
                    } else {
                        this.setColors(colors[0], ColorHelper.getContraColor(colors[0]));

                    }
                });
        }

        setColors(first: IColor, second: IColor) {
            this.firstColor = ColorHelper.getRGBString([first]);
            this.secondColor = ColorHelper.getRGBString([second]);
        }

        destroyed() {
            this.onDestroyed.next();
            this.onDestroyed.complete();
        }
    }
</script>
