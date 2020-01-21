<template>
    <router-view/>
</template>

<script lang="ts">
    import { Actions$, nextActionFromMsg } from '../../Shared/actions/actions';
    import router from './router';
    import { VidtPresets } from '../../Shared/vidt-presets';

    import { Component } from 'vue-property-decorator';
    import Vue from 'vue';

    @Component
    export default class App extends Vue {
        public subscription: any;

        mounted() {
            // We have to do it like this as TypeScript and vue-socket.io lib don't like each other
            this['sockets'].subscribe('toVidt', nextActionFromMsg);

            this.subscription = Actions$.prepareVidt.subscribe((preset: number) => {
                    router.push({path: '/' + VidtPresets[preset]}).catch(() => {
                    });
                },
            );
        }

        destroyed() {
            if (typeof this.subscription !== 'undefined') {
                this.subscription.unsubscribe();
            }
        }
    }
</script>

<style lang="scss">
    @import "./scss/layout";
</style>
