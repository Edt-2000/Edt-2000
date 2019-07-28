import { enumToArray } from './utils';

export enum VidtPresets {
    '____EMPTY____',
    'logo',
    'bluescreen',
    'color',
    'gridscape',
    'hacking',
    'photobouncer',
    'photoglitcher',
    'textBouncer',
    'shutdown',
    'video',
    'vista',
    'colorTwinkle',
    'karaoke',
}

export const vidtPresetsArr = enumToArray(VidtPresets);

export enum animationTypes {
    bounce = 'bounce',
    rotate = 'rotate',
    spin = 'spin',
    stretch = 'stretch',
}
