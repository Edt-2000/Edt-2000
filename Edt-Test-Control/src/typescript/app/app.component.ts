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
            name: this.vidtPresets.Bluescreen,
            path: '/bluescreen'
        },
        {
            name: this.vidtPresets.Gridscape,
            path: '/gridscape'
        },
        {
            name: this.vidtPresets.Hacking,
            path: '/hacking'
        },
        {
            name: this.vidtPresets.Logo,
            path: '/logo'
        },
        {
            name: this.vidtPresets.ScreensaveBouncer,
            path: '/screensave-bouncer'
        },
        {
            name: this.vidtPresets.Shutdown,
            path: '/shutdown'
        },
        {
            name: this.vidtPresets.Vista,
            path: '/vista'
        },
    ];
    public intensitys: number[] = [1, 2, 3, 4 ,5, 6, 7, 8, 9];
    public defaultText: string = 'Strobocops';
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


    setBeat() {
        if (this.socketConnected) {
            this.socket.emit('beat', {
                'beat': true
            });
        }
    }

    setText(text: string) {
        const textToSend = (text ? text : this.defaultText);

        if (this.socketConnected) {
            this.socket.emit('text', {
                'text': textToSend.toUpperCase()
            });
        }
    }

    showBeat() {
        return this.currentPreset && (
            this.currentPreset.name == this.vidtPresets.Gridscape
        );
    }

    showTextInput() {
        return this.currentPreset && (
            this.currentPreset.name == this.vidtPresets.ScreensaveBouncer
        );
    }

    showIntensity() {
        return this.currentPreset &&(
            this.currentPreset.name == this.vidtPresets.Logo
        );
    }

}

