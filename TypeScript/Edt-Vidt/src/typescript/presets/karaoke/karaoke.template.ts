module.exports = `
<div class="karaoke">
    <div class="karaoke__inner" v-bind:class="cssClass">
        <p class="karaoke__text" v-bind:style="styles">{{ text }}</p>
    </div>
</div>
`;
