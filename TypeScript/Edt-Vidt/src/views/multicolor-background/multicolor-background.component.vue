<template>
    <div class="multicolor-background" v-bind:style="styles"></div>
</template>

<script lang="ts">
    import './multicolor-background.scss';
    import Vue from 'vue';
    import { Component } from 'vue-property-decorator';
    import { Actions$ } from '../../../../Shared/actions/actions';
    import { ColorHelper } from '../../../../Shared/colors/converters';
    import { IColor } from '../../../../Shared/colors/types';
    import { takeUntil } from 'rxjs/operators';
    import { Subject } from 'rxjs';

    @Component
    export default class MultiColorBackgroundComponent extends Vue {
        public styles: Object = {};

        private onDestroyed: Subject<any> = new Subject();

        mounted() {
            Actions$.vidtSingleColor
                .pipe(takeUntil(this.onDestroyed))
                .subscribe((color: IColor) => {
                    this.setColors([color, ColorHelper.getContraColor(color)]);
                });

            Actions$.vidtMultiColor
                .pipe(takeUntil(this.onDestroyed))
                .subscribe((colors: IColor[]) => {
                    this.setColors(colors);

                });
        }

        setColors(colors: IColor[]) {
            const bcgColor = ColorHelper.getRGBString(colors);
            this.styles = {
                background: `${bcgColor}`,
            };
        }

        destroyed() {
            this.onDestroyed.next();
            this.onDestroyed.complete();
        }
    }
</script>
