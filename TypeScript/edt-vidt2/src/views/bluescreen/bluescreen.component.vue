<template>
    <div class="bluescreen">
        <div class="bluescreen__content">

            <div class="bluescreen__heading">
                <h2 class="bluescreen__title">Windows</h2>
            </div>

            <p class="bluescreen__text">A fatal exception 0E has occured at 0028:C0034B23. The current application will
                be terminated</p>

            <ul class="bluescreen__list">
                <li class="bluescreen__list-item">Press any key to terminate the current application</li>
                <li class="bluescreen__list-item">Press CTRL+ALT+DEL again to restart your computer. You will lose any
                    unsaved information in all applications
                </li>
            </ul>

            <p class="bluescreen__footer">Press any key to continue <span class="bluescreen__cursor">_</span></p>
        </div>
    </div>
</template>

<script lang="ts">
    import "./bluescreen.scss";

    import Vue from "vue";
    import { Component } from "vue-property-decorator";

    @Component
    export default class BluescreenComponent extends Vue {
    }
</script>

