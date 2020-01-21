<template>
    <div class="karaoke">
        <div class="karaoke__inner" v-bind:class="cssClass">
            <p class="karaoke__text" v-bind:style="styles">{{ text }}</p>
        </div>
    </div>
</template>

<script lang="ts">
    import './karaoke.scss';
    import Vue from 'vue';
    import { Component } from 'vue-property-decorator';
    import { Actions$ } from '../../../../Shared/actions/actions';
    import { ColorHelper } from '../../../../Shared/colors/converters';
    import { IColor } from '../../../../Shared/colors/types';

    const convert = require('color-convert');

    @Component
    export default class KaraokeComponent extends Vue {
        public textSubscription: any;
        public colorSubscription: any;

        public $refs: {
            text: HTMLElement;
        };

        public cssClass: string = '';
        public styles: Object = {};
        public text: string = 'bounce';

        mounted() {
            this.textSubscription = Actions$.mainText.subscribe(text => {
                // if same bounce
                if (this.text === text) {
                    this.text = text;
                    // wait for text to be in dom
                    requestAnimationFrame(() => {
                        this.cssClass = 'is-hidden';

                        window.setTimeout(() => {
                            this.cssClass = '';
                        }, 150);
                    });
                } else {
                    this.text = text;
                }
            });

            this.colorSubscription = Actions$.vidtSingleColor.subscribe(
                (color: IColor) => {
                    this.setStyles([color]);
                },
            );
        }

        setStyles(colors: IColor[]) {
            const bcgColor = ColorHelper.getRGBString(colors);

            this.styles = {
                color: `${bcgColor}`,
            };
        }

        destroyed() {
            if (typeof this.textSubscription !== 'undefined') {
                this.textSubscription.unsubscribe();
            }

            if (typeof this.colorSubscription !== 'undefined') {
                this.colorSubscription.unsubscribe();
            }
        }
    }
</script>
