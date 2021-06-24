<template>
    <!-- TODO: Css variables -->
    <div class="color-blocks"
         v-bind:class="[sizeClass, shapeClass]"
         v-bind:style="{ '--front-color': frontColor, '--back-color': backColor }"
    >
        <ul class="color-blocks__list">
            <li class="color-blocks__item" v-for="block in blocks">
                <div class="color-blocks__block">
                    <div class="color-blocks__front"></div>
                    <div class="color-blocks__back"></div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import './color-blocks.scss';
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { ColorHelper } from '../../../../Shared/colors/converters';
import { Actions$ } from '../../../../Shared/actions/actions';
import { IColor } from '../../../../Shared/colors/types';
import { Sizes } from '../../../../Shared/vidt/sizes';
import { Shapes } from '../../../../Shared/vidt/shapes';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component
    export default class ColorBlocksComponent extends Vue {
        public sizeClass: string = '';
        public shapeClass: string = '';

        public size: Sizes = Sizes.normal;
        public shape: Shapes = Shapes.square;
        public blocks: number[] = Array(50).map((x, i) => i + 1);

        public frontColor: string = '#ff0000';
        public backColor: string = '#00ff00';

        private onDestroyed: Subject<any> = new Subject();

        @Watch('size', { immediate: true })
        public setCssSizeClass() {
            this.sizeClass = 'color-blocks--' + this.size;
            const amount = this.size === 'small' ? 75 : 50;
            this.blocks = Array(amount).map((x, i) => i + 1);
        }

        @Watch('shape', { immediate: true })
        public setCssTypeClass() {
            this.shapeClass = 'color-blocks--' + this.shape;
        }

        mounted() {
            Actions$.shape
                .pipe(takeUntil(this.onDestroyed))
                .subscribe((shape: Shapes) => {
                    this.shape = shape;
                })

             Actions$.size
                .pipe(takeUntil(this.onDestroyed))
                .subscribe((size: Sizes) => {
                    this.size = size;
                })

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
                    } else if (colors.length == 0) {
                        this.setColors(colors[0], ColorHelper.getContraColor(colors[0]));

                    }
                });
        }

        setColors(front: IColor, back: IColor) {
            this.frontColor = ColorHelper.getRGBString([front]);
            this.backColor = ColorHelper.getRGBString([back]);
        }

        destroyed() {
            this.onDestroyed.next();
            this.onDestroyed.complete();
        }
    }
</script>
