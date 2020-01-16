import { enumToArray } from './helpers/utils';

export enum VidtPresets {
    '____EMPTY____',
    'logo',
    'bluescreen',
    'color',
    'multicolor',
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
    'colorBlocks',
}

export const vidtPresetsArr = enumToArray(VidtPresets);

export enum AnimationTypes {
    '____EMPTY____',
    bounce,
    rotate,
    spin,
    stretch,
    mirror,
}

export const animationTypeArr = enumToArray(AnimationTypes);
