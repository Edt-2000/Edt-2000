<template>
    <router-view/>
</template>

<script lang="ts">
    import { Actions$ } from "../../Shared/actions";
    import router from "./router";
    import { VidtPresets } from "../../Shared/vidt-presets";

    import { Component } from "vue-property-decorator";
    import Vue from "vue";

    @Component
    export default class App extends Vue {
        public subscription: any;

        mounted() {
            this.subscription = Actions$.prepareVidt.subscribe(
                (preset: number) => {
                    router.push({path: "/" + VidtPresets[preset]});
                },
            );
        }

        destroyed() {
            if (typeof this.subscription !== "undefined") {
                this.subscription.unsubscribe();
            }
        }
    }
</script>

<style lang="scss">
    @import "./scss/layout";
</style>
