module.exports = `
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
`;
