module.exports = `
<div class="app">
    <div class="options">
        <div class="options__section">
            <h2 class="options__title">Presets</h2>
            <ul class="options__list">
                <li class="options__item" v-for="preset in presets">
                    <button class="button button--preset" 
                    v-bind:class="{ 'is-active': (preset === currentPreset) }" 
                    v-on:click="setPreset(preset)"
                    >{{ preset.name }}</button>
                </li>
            </ul>
        </div>
        
        <div class="options__section" v-if="showIntensity()">
            <h2 class="options__title">Intensity</h2>
            <ul class="options__list">
                <li class="options__item" v-for="intensity in intensityRange()">
                    <button class="button" 
                    v-bind:class="'button--intensity-' + intensity" 
                    v-on:click="sendIntensity(intensity)"
                    >{{ intensity }}</button>   
                </li>
            </ul>
        </div>
        
        <div class="options__section" v-if="showBeat()">
            <h2 class="options__title">Beat</h2>
            <ul class="options__list">
                <li class="options__item">
                    <button class="button" v-on:click="sendBeat()">Beat me</button>   
                </li>
            </ul>
        </div>
        
        <div class="options__section" v-if="showTextInput()">
            <h2 class="options__title">Tekst</h2>
            <ul class="options__list">
                <li class="options__item" v-for="textOption in textOptions">
                    <button class="button" 
                    v-bind:class="{ 'is-active': (text === textOption) }"
                    v-on:click="setText(textOption)"
                    >{{ textOption }}</button>   
                </li>
            </ul>
            <ul class="options__list">
                 <li class="options__item">
                    <input id="custom-text" class="form__input" type="text" v-model="text">
                </li>
            </ul>
        </div>
    </div>
</div>
`;