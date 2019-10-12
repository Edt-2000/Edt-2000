<template>
    <div class="shutdown">
        <div class="shutdown__text">format c:</div>
    </div>
</template>

<script lang="ts">
    import "./shutdown.scss";
    import Vue from "vue";
    import { Component } from "vue-property-decorator";

    @Component
    export default class ShutdownComponent extends Vue {
    }
</script>
