module.exports = `
<div class="app">
    <div class="options">
        <div class="options__section">
            <h2 class="options__title">Presets</h2>
            <ul class="options__list">
                <li class="options__item" v-for="preset in presets">
                    <button class="button" v-on:click="setPreset(preset)">{{ preset.name }}</button>   
                </li>
            </ul>
        </div>
        
        <div class="options__section" v-if="showIntensity()">
            <h2 class="options__title">Intensity</h2>
            <ul class="options__list">
                <li class="options__item" v-for="intensity in intensitys">
                    <button class="button" v-bind:class="'button--intensity-' + intensity" v-on:click="setIntensity(intensity)">{{ intensity }}</button>   
                </li>
            </ul>
        </div>
        
        <div class="options__section" v-if="showBeat()">
            <h2 class="options__title">Beat</h2>
            <ul class="options__list">
                <li class="options__item">
                    <button class="button" v-on:click="setBeat()">Beat me</button>   
                </li>
            </ul>
        </div>
        
        <div class="options__section" v-if="showTextInput()">
            <h2 class="options__title">Tekst</h2>
            <ul class="options__list">
                <li class="options__item">
                    <button class="button" v-on:click="setText(defaultText)">{{ defaultText }}</button>   
                </li>
                 <li class="options__item">
                    <input class="input" type="text" v-model="customText" v-on:keyup="setText(customText)">
                </li>
            </ul>
        </div>
    </div>
</div>
`;