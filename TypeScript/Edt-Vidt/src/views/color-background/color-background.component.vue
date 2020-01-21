<template>
    <div class="color-background" v-bind:style="styles"></div>
</template>

<script lang="ts">
    import './color-background.scss';
    import Vue from 'vue';
    import { Component } from 'vue-property-decorator';
    import { Actions$ } from '../../../../Shared/actions/actions';
    import { ColorHelper } from '../../../../Shared/colors/converters';
    import { IColor } from '../../../../Shared/colors/types';

    @Component
    export default class ColorBackgroundComponent extends Vue {
        public singleColorSubscription: any;
        public styles: Object = {};

        mounted() {
            this.singleColorSubscription = Actions$.vidtSingleColor.subscribe(
                (color: IColor) => {
                    this.setStyles([color]);
                },
            );
        }

        setStyles(colors: IColor[]) {
            const bcgColor = ColorHelper.getRGBString(colors);
            this.styles = {
                background: `${bcgColor}`,
            };
        }

        destroyed() {
            if (typeof this.singleColorSubscription !== 'undefined') {
                this.singleColorSubscription.unsubscribe();
            }
        }
    }
</script>
