import Vue from 'vue';
import * as _ from 'lodash';
import * as io from 'socket.io-client';
import { Component, Watch } from 'vue-property-decorator';
import { IPreset, PresetBeatInput, PresetIntensityInput, PresetPhotoInput, PresetTextInput, PresetVideoInput, VidtPresets } from '../../../../Shared/presets';
import { IPhotoAsset, IVideoAsset, photoAssets, videoAssets } from '../../../../Shared/assets';

@Component({
    name: 'app',
    template: require('./app.template')
})
export default class App extends Vue {
    private socket = io('localhost:8080');
    public socketConnected: boolean = false;

    public beatInput : PresetBeatInput|undefined = undefined;
    public intensityInput : PresetIntensityInput|undefined = undefined;
    public photoInput : PresetPhotoInput|undefined = undefined;
    public textInput : PresetTextInput|undefined = undefined;
    public videoInput : PresetVideoInput|undefined = undefined;

    public presets: IPreset[] = VidtPresets;
    public currentPreset: IPreset|null = null;

    public photoAssets: IPhotoAsset[] = photoAssets;
    public currentPhoto: IPhotoAsset|null = null;

    public videoAssets: IVideoAsset[] = videoAssets;
    public currentVideo: IVideoAsset|null = null;

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
        this.photoInput     = _.find(this.currentPreset.inputs, (p) => p instanceof PresetPhotoInput) as PresetPhotoInput;
        this.textInput      = _.find(this.currentPreset.inputs, (p) => p instanceof PresetTextInput) as PresetTextInput;
        this.videoInput     = _.find(this.currentPreset.inputs, (p) => p instanceof PresetVideoInput) as PresetVideoInput;

        this.sendPreset();
    }

    setText(text: string) {
        this.text = text.toLowerCase();
    }

    setPhoto(photo: IPhotoAsset) {
        this.currentPhoto = photo;
        this.sendPhoto();
    }

    setVideo(video: IVideoAsset) {
        this.currentVideo = video;
        this.sendVideo();
    }

    showBeatInput() {
        return this.currentPreset && this.beatInput;
    }

    showPhotoInput() {
        return this.currentPreset && this.photoInput;
    }

    showTextInput() {
        return this.currentPreset && this.textInput;
    }

    showIntensityInput() {
        return this.currentPreset && this.intensityInput;
    }

    showVideoInput() {
        return this.currentPreset && this.videoInput;
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
    sendBeat() {
        if (this.socketConnected) {
            this.socket.emit('beat', {
                'beat': true
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

    sendPhoto() {
        if (this.socketConnected) {
            this.socket.emit('photo', {
                'photo': this.currentPhoto
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

    sendVideo() {
        if (this.socketConnected) {
            this.socket.emit('video', {
                'video': this.currentVideo
            });
        }
    }
}

