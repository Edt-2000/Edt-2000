import Vue from 'vue';
import * as _ from 'lodash';
import * as io from 'socket.io-client';
import { Component, Watch } from 'vue-property-decorator';
import { animations, animationTypes, IPreset, PresetAnimationInput, PresetBeatInput, PresetColorInput, PresetIntensityInput, PresetPhotoInput, PresetTextInput, PresetVideoInput, VidtPresets } from '../../../../Shared/vidt-presets';
import { IPhotoAsset, IVideoAsset, photoAssets, videoAssets } from '../../../../Shared/assets';

@Component({
    name: 'app',
    template: require('./app.template')
})
export default class App extends Vue {
    private socket = io('localhost:8080');
    public socketConnected: boolean = false;

    public animationInput : PresetAnimationInput|undefined = undefined;
    public beatInput : PresetBeatInput|undefined = undefined;
    public colorInput : PresetColorInput|undefined = undefined;
    public intensityInput : PresetIntensityInput|undefined = undefined;
    public photoInput : PresetPhotoInput|undefined = undefined;
    public textInput : PresetTextInput|undefined = undefined;
    public videoInput : PresetVideoInput|undefined = undefined;

    public presets: IPreset[] = VidtPresets;
    public currentPreset: IPreset|null = null;

    public animations: animationTypes[] = animations;
    public currentAnimation: animationTypes|null = animations[0];

    public photoAssets: IPhotoAsset[] = photoAssets;
    public currentPhoto: IPhotoAsset|null = photoAssets[0];

    public videoAssets: IVideoAsset[] = videoAssets;
    public currentVideo: IVideoAsset|null = videoAssets[0];

    public textOptions: string[] = ['bounce', 'strobocops', 'lalala', 'edt'];
    public text: string = this.textOptions[0];

    public hues: number[] = [];
    public doubleColor: boolean = false;
    public pulse: boolean = false;
    public pulseDuration: number;

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

        this.animationInput = _.find(this.currentPreset.inputs, (p) => p instanceof PresetAnimationInput) as PresetAnimationInput;
        this.colorInput     = _.find(this.currentPreset.inputs, (p) => p instanceof PresetColorInput) as PresetColorInput;
        this.beatInput      = _.find(this.currentPreset.inputs, (p) => p instanceof PresetBeatInput) as PresetBeatInput;
        this.intensityInput = _.find(this.currentPreset.inputs, (p) => p instanceof PresetIntensityInput) as PresetIntensityInput;
        this.photoInput     = _.find(this.currentPreset.inputs, (p) => p instanceof PresetPhotoInput) as PresetPhotoInput;
        this.textInput      = _.find(this.currentPreset.inputs, (p) => p instanceof PresetTextInput) as PresetTextInput;
        this.videoInput     = _.find(this.currentPreset.inputs, (p) => p instanceof PresetVideoInput) as PresetVideoInput;

        this.sendPreset();
        this.sendDefaults();
    }

    setAnimation(animation: animationTypes) {
        this.currentAnimation = animation;
        this.sendAnimation();
    }

    setText(text: string) {
        this.text = text.toLowerCase();
    }

    setPulse() {
        this.pulse = !this.pulse;
    }

    setDoubleColor() {
        this.doubleColor = !this.doubleColor;
    }

    setPhoto(photo: IPhotoAsset) {
        this.currentPhoto = photo;
        this.sendPhoto();
    }

    setVideo(video: IVideoAsset) {
        this.currentVideo = video;
        this.sendVideo();
    }

    showAnimationInput() {
        return this.currentPreset && this.animationInput;
    }

    showBeatInput() {
        return this.currentPreset && this.beatInput;
    }

    showColorInput() {
        return this.currentPreset && this.colorInput;
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

    generateColor() {
        this.hues = [];
        this.hues.push(this.randomHue());
        if (this.doubleColor) {
            this.hues.push(this.randomHue());
        }

        this.pulseDuration = (this.pulse ? Math.ceil(Math.random() * 6) : 0);

        this.sendColor();
    }

    randomHue() {
        return Math.ceil(Math.random() * 360);
    }

    sendDefaults() {
        if (this.animationInput) {
            this.sendAnimation();
        }

        if (this.photoInput) {
            this.sendPhoto();
        }

        if (this.textInput) {
            this.sendText();
        }

        if (this.videoInput) {
            this.sendVideo();
        }
    }

    sendPreset() {
        if (this.socketConnected) {
            this.socket.emit('preset', {
                'preset': this.currentPreset
            });
        }
    }

    sendAnimation() {
        if (this.socketConnected) {
            this.socket.emit('animation', {
                'animation': this.currentAnimation
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

    sendColor() {
        if (this.socketConnected) {
            this.socket.emit('color', {
                'hues': this.hues,
                'saturation': 100,
                'value': 100,
                'duration': this.pulseDuration
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

