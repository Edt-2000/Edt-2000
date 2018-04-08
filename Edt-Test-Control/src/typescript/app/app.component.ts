import Vue from 'vue';
import * as _ from 'lodash';
import * as io from 'socket.io-client';
import { Component, Watch } from 'vue-property-decorator';
import { IPreset, IPresetInput, PresetBeatInput, PresetIntensityInput, PresetTextInput, VidtPresets } from '../../../../Shared/presets';

@Component({
    name: 'app',
    template: require('./app.template')
})
export default class App extends Vue {
    private socket = io('localhost:8080');
    public socketConnected: boolean = false;

    public currentPreset: IPreset|null = null;
    public presets: IPreset[] = VidtPresets;

    public beatInput : PresetBeatInput|undefined = undefined;
    public intensityInput : PresetIntensityInput|undefined = undefined;
    public textInput : PresetTextInput|undefined = undefined;

    public intensitys: number[] = [1, 2, 3, 4 ,5, 6, 7, 8, 9];

    public textOptions: string[] = ['bounce', 'strobocops', 'lalala', 'edt'];
    public text: string = this.textOptions[0];

    @Watch('text')
    updateText() {
        this.text = this.text.toLowerCase();
        this.sendText();
    };

    mounted() {
        this.socket.on('connect', () =>{
            this.socketConnected = true;
        });

        this.socket.on('message', (message: any) => {
            console.log('message', message);
        });
    }

    setPreset(preset: IPreset) {
        this.currentPreset = preset;

        this.beatInput      = _.find(this.currentPreset.inputs, (p) => p instanceof PresetBeatInput) as PresetBeatInput;
        this.intensityInput = _.find(this.currentPreset.inputs, (p) => p instanceof PresetIntensityInput) as PresetIntensityInput;
        this.textInput      = _.find(this.currentPreset.inputs, (p) => p instanceof PresetTextInput) as PresetTextInput;

        this.sendPreset();
    }

    setText(text: string) {
        this.text = text.toLowerCase();
    }

    showBeat() {
        return this.currentPreset && (
            this.currentPreset.inputs.some((p) => p instanceof PresetBeatInput)
        );
    }

    showTextInput() {
        return this.currentPreset && (
            this.currentPreset.inputs.some((p) => p instanceof PresetTextInput)
        );
    }

    showIntensity() {
        return this.currentPreset && (
            this.currentPreset.inputs.some((p) => p instanceof PresetIntensityInput)
        );
    }

    intensityRange(): number[] {
        if(this.intensityInput !== undefined) {
            const min = this.intensityInput.min;
            const max = this.intensityInput.max;

            return Array(max - min + 1).fill(0).map((_, idx) => min + idx)
        }

        return [];
    }

    sendPreset() {
        if (this.socketConnected) {
            this.socket.emit('preset', {
                'preset': this.currentPreset
            });
        }
    }

    sendIntensity(intensity: number) {
        if (this.socketConnected) {
            this.socket.emit('intensity', {
                'intensity': intensity
            });
        }
    }


    sendBeat() {
        if (this.socketConnected) {
            this.socket.emit('beat', {
                'beat': true
            });
        }
    }

    sendText() {
        if (this.socketConnected) {
            this.socket.emit('text', {
                'text': this.text
            });
        }
    }
}

