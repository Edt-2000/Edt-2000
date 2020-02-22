import { enumToArray } from './utils/utils';

export enum VidtPresets {
    '____EMPTY____',
    'logo',
    'bluescreen',
    'color',
    // 'multicolor',
    'gridscape',
    'hacking',
    'photobouncer',
    'photoglitcher',
    'textBouncer',
    'shutdown',
    // 'video',
    'vista',
    'colorTwinkle',
    'karaoke',
    'colorBlocks',
}

export const vidtPresetsArr = enumToArray(VidtPresets);
