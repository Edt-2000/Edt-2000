<template>
    <div class="color-blocks">
        <ul class="color-blocks__list">
            <li class="color-blocks__item"><div class="color-blocks__block"></div></li>
        </ul>
    </div>
</template>

<script lang="ts">
    import "./color-blocks.scss";
    import Vue from 'vue';
    import { Component } from 'vue-property-decorator';

    @Component
    export default class ColorBlocksComponent extends Vue {

        mounted() {

        }

        destroyed() {

        }
    }
</script>
