import Vue from 'vue';
import * as io from 'socket.io-client';
import { PresetModel, VidtPresets } from '../../../../SharedTypes/socket';
import { Component, Watch } from 'vue-property-decorator';

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
            name: this.vidtPresets.PhotoBouncer,
            path: '/photo-bouncer'
        },
        {
            name: this.vidtPresets.PhotoGlitcher,
            path: '/photo-glitcher'
        },
        {
            name: this.vidtPresets.Logo,
            path: '/logo'
        },
        {
            name: this.vidtPresets.TextBouncer,
            path: '/text-bouncer'
        },
        {
            name: this.vidtPresets.Shutdown,
            path: '/shutdown'
        },
        {
            name: this.vidtPresets.VideoPlayer,
            path: '/video-player'
        },
        {
            name: this.vidtPresets.Vista,
            path: '/vista'
        },
    ];

    public intensitys: number[] = [1, 2, 3, 4 ,5, 6, 7, 8, 9];

    public textOptions: string[] = ['strobocops', 'lalala', 'edt'];
    public text: string = this.textOptions[0];

    @Watch('text')
    setCssClass() {
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


    setText(text: string) {
        this.text = text.toLowerCase();
    }

    showBeat() {
        return this.currentPreset && (
            this.currentPreset.name == this.vidtPresets.Gridscape
        );
    }

    showTextInput() {
        return this.currentPreset && (
            this.currentPreset.name == this.vidtPresets.TextBouncer
        );
    }

    showIntensity() {
        return this.currentPreset &&(
            this.currentPreset.name == this.vidtPresets.Logo
        );
    }


    sendPreset(preset: PresetModel) {
        this.currentPreset = preset;

        if (this.socketConnected) {
            this.socket.emit('preset', {
                'preset': preset.path
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

