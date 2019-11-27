<template>
    <div class="color-blocks">
        <ul class="color-blocks__list">
            <li class="color-blocks__item" v-for="block in blocks">
                <div class="color-blocks__block">
                    <div class="color-blocks__front" v-bind:style="{ backgroundColor: frontColor }"></div>
                    <div class="color-blocks__back" v-bind:style="{ backgroundColor: backColor }"></div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import "./color-blocks.scss";
    import Vue from 'vue';
    import { Component } from 'vue-property-decorator';
    import { IColor } from '../../../../Shared/helpers/types';
    import { ColorHelper } from "../../../../Shared/helpers/hsv-2-rgb";
    import { Actions$ } from '../../../../Shared/actions';

    @Component
    export default class ColorBlocksComponent extends Vue {
        public singleColorSubscription: any;
        public multiColorSubscription: any;
        public blocks: number[] = Array(50).map((x, i) => i + 1);

        public frontColor: string = '#ff0000';
        public backColor: string =  '#00ff00';

        mounted() {
            this.singleColorSubscription = Actions$.vidtSingleColor.subscribe(
                (color: IColor) => {
                    this.setColors(color, ColorHelper.getContraColor(color));
                },
            );

            this.multiColorSubscription = Actions$.vidtMultiColor.subscribe(
                (colors: IColor[]) => {
                    if (colors.length > 1) {
                        this.setColors(colors[0], colors[colors.length]);
                    } else {
                        this.setColors(colors[0], ColorHelper.getContraColor(colors[0]));

                    }
                },
            );
        }

        setColors(front: IColor, back: IColor ) {
            this.frontColor = ColorHelper.getRGBString([front]);
            this.backColor = ColorHelper.getRGBString([back]);
        }

        destroyed() {
            if (typeof this.singleColorSubscription !== "undefined") {
                this.singleColorSubscription.unsubscribe();
            }

            if (typeof this.multiColorSubscription !== "undefined") {
                this.multiColorSubscription.unsubscribe();
            }
        }
    }
</script>
