<template>
    <div class="glitch-text" v-bind:class="[ cssClass ]">
        <div class="glitch-text__inner">
            <span class="glitch-text__color glitch-text__color--first">{{ text }}</span>
            <span class="glitch-text__color glitch-text__color--second">{{ text }}</span>
            <span class="glitch-text__color glitch-text__color--third">{{ text }}</span>
            <span class="glitch-text__main">{{ text }}</span>
        </div>
        <span class="glitch-text__line glitch-text__line--first"></span>
        <span class="glitch-text__line glitch-text__line--second"></span>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component, Prop, Watch } from "vue-property-decorator";

    @Component
    export default class GlitchText extends Vue {
        public cssClass: string = "";

        @Prop() public text;

        @Prop() public level;

        @Watch("level")
        public setCssClass() {
            this.cssClass = this.level ? "glitch-text--level" + this.level : "";
        }
    }
</script>
