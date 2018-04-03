import Vue from 'vue';
import Component from 'vue-class-component';
import * as io from 'socket.io-client';
import { PresetModel, VidtPresets } from '../../../../SharedTypes/socket';

@Component({
    name: 'app',
    template: require('./app.template')
})
export default class App extends Vue {
    private socket = io('localhost:8080');

    public socketConnected: boolean = false;
    public currentPreset: PresetModel|null = null;
    public vidtPresets = VidtPresets;
    public presets: PresetModel[] = [
        {
            name: this.vidtPresets.Logo,
            path: '/logo'
        },
        {
            name: this.vidtPresets.ScreensaveBouncer,
            path: '/screensave-bouncer'
        }
    ];
    public intensitys: number[] = [1, 2, 3, 4 ,5, 6, 7, 8, 9];
    public customText: string = '';

    mounted() {
        this.socket.on('connect', () =>{
            this.socketConnected = true;
        });

        this.socket.on('message', (message: any) => {
            console.log('message', message);
        });
    }

    setPreset(preset: PresetModel) {
        this.currentPreset = preset;

        if (this.socketConnected) {
            this.socket.emit('preset', {
                'preset': preset.path
            });
        }
    }

    setIntensity(intensity: number) {
        if (this.socketConnected) {
            this.socket.emit('intensity', {
                'intensity': intensity
            });
        }
    }

    setText(text: string) {
        if (this.socketConnected) {
            this.socket.emit('text', {
                'text': text.toUpperCase()
            });
        }
    }
}

