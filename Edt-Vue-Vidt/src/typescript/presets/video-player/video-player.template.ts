module.exports = `
<div class="video">
    <video class="video__player" muted loop ref="video">
        <source v-bind:src="src" type="video/mp4">
        Your browser does not support the video tag.
    </video>

    <div v-if="overlay" class="video__overlay"></div>
</div>
`;