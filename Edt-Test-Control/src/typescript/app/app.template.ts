module.exports = `
<div class="app">
    <div class="options">
        <div class="options__section">
            <h2 class="options__title">Presets</h2>
            <ul class="options__list">
                <li class="options__item" v-for="preset in presets">
                    <button class="options__button" v-on:click="setPreset(preset)">{{ preset.name }}</button>   
                </li>
            </ul>
        </div>
        
        <div class="options__section" v-if="currentPreset && currentPreset.name == vidtPresets.Logo">
            <h2 class="options__title">Intensity</h2>
            <ul class="options__list">
                <li class="options__item" v-for="intensity in intensitys">
                    <button class="options__button" v-on:click="setIntensity(intensity)">{{ intensity }}</button>   
                </li>
            </ul>
        </div>
    </div>
</div>
`;