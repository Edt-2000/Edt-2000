<template>
    <div class="color-twinkle">
        <div class="color-twinkle__star" v-bind:style="styles" v-for="star in stars">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</template>

<script lang="ts">
    import './color-twinkle.scss';

    import Vue from 'vue';
    import { Component } from 'vue-property-decorator';
    import { Actions$ } from '../../../../Shared/actions/actions';
    import { ColorHelper } from '../../../../Shared/colors/converters';
    import { IColor } from '../../../../Shared/colors/types';

    @Component
    export default class ColorTwinkleComponent extends Vue {
        public colorSubscription: any;
        public styles: Object = {};
        public $refs: {
            color: HTMLElement;
        };

        public stars: number[] = Array(400).map((x, i) => i + 1);

        mounted() {
            this.colorSubscription = Actions$.vidtSingleColor.subscribe(item => {
                this.setStyles(item);
            });
        }

        setStyles(hsb: IColor) {
            this.styles = {
                color: ColorHelper.getRGBString([hsb]),
            };
        }

        destroyed() {
            if (typeof this.colorSubscription !== 'undefined') {
                this.colorSubscription.unsubscribe();
            }
        }
    }
</script>
