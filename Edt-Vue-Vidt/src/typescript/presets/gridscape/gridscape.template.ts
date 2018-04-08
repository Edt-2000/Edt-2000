module.exports = `
<div class="gridscape">
    <div class="gridscape__horizon">
        <div class=gridscape__star v-for="star in stars"></div>
        <div class="gridscape__sun" ref="sun">
        </div>
    </div>
    <div class="gridscape__land">
        <div class="gridscape__lines-horizontal">
            <div class="gridscape__line-horizontal" v-for="line in linesHorizontal"></div>
        </div>
        <div class="gridscape__lines-vertical">
            <div class="gridscape__line-vertical" v-for="line in linesVertical"></div>
        </div>
        <div class="gridscape__overlay"></div>
    </div>
</div>
`;