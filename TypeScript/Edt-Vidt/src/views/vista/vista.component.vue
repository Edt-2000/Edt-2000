<template>
    <div class="vista">
        <img class="vista__logo" src="./vista.png" v-for="index in 40">
    </div>
</template>

<script lang="ts">
    import "./vista.scss";
    import Vue from "vue";
    import { Component } from "vue-property-decorator";

    @Component
    export default class VistaComponent extends Vue {
    }
</script>
