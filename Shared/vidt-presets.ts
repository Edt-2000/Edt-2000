import { IPhotoAsset, IVideoAsset } from './assets';

export interface IPreset {
    name: string;
    path: string;
    inputs: IPresetInput[];
}

// inputs
export interface IPresetInput {
    name: string;
}

export class PresetBeatInput implements IPresetInput {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

export class PresetAnimationInput implements IPresetInput {
    name: string;
    type: animationTypes;

    constructor(name: string) {
        this.name = name;
    }
}

export class PresetIntensityInput implements IPresetInput {
    name: string;
    min: number;
    max: number;

    constructor(name: string, min: number, max: number) {
        this.name = name;
        this.min = min;
        this.max = max;
    }
}

export class PresetPhotoInput implements IPresetInput {
    name: string;
    photo: IPhotoAsset;

    constructor(name: string) {
        this.name = name;
    }
}

export class PresetTextInput implements IPresetInput {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

export class PresetVideoInput implements IPresetInput {
    name: string;
    video: IVideoAsset;

    constructor(name: string) {
        this.name = name;
    }
}

export enum animationTypes {
    bounce = 'bounce',
    rotate = 'rotate',
    spin = 'spin',
    stretch = 'stretch'
}

export const animations = [
    animationTypes.bounce,
    animationTypes.rotate,
    animationTypes.spin,
    animationTypes.stretch
];

// vidt Presets

export const VidtPresets: IPreset[] = [
    {
        name: 'bluescreen',
        path: '/bluescreen',
        inputs: []
    },
    {
        name: 'gridscape',
        path: '/gridscape',
        inputs: [
            new PresetBeatInput('beat')
        ]
    },
    {
        name: 'hacking',
        path: '/hacking',
        inputs: []
    },
    {
        name: 'photo-bouncer',
        path: '/photo-bouncer',
        inputs: [
            new PresetBeatInput('beat'),
            new PresetPhotoInput('photo')
        ]
    },
    {
        name: 'photo-glitcher',
        path: '/photo-glitcher',
        inputs: [
            new PresetPhotoInput('photo'),
            new PresetAnimationInput('animation')
        ]
    },
    {
        name: 'logo',
        path: '/logo',
        inputs: [
            new PresetIntensityInput('intensity', 1, 9)
        ]
    },
    {
        name: 'text-bouncer',
        path: '/text-bouncer',
        inputs: [
            new PresetTextInput('text')
        ]
    },
    {
        name: 'shutdown',
        path: '/shutdown',
        inputs: []
    },
    {
        name: 'video-player',
        path: '/video-player',
        inputs: [
            new PresetVideoInput('photo'),
            new PresetBeatInput('beat')
        ]
    },
    {
        name: 'vista',
        path: '/vista',
        inputs: []
    },
];