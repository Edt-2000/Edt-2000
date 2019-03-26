module.exports = `
<div class="logo">
    <div class="logo__stars">
        <div class="logo__star" v-for="star in stars"></div>
    </div>
    <div class="logo__text">
        <glitch-text v-bind:text="text" v-bind:level="level"></glitch-text>
    </div>
</div>
`;
